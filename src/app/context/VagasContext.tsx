'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Vacancy, VacancyContextProps } from '../types/vacancyType';
import { sanitizeVacancy } from '@/app/schemas/vacancySchema'; // 🔥 Sanitização de dados
import { vacancySchema } from '@/app/schemas/vacancySchema'; // 🔥 Importando o schema

const API_URL = "https://api.example.com/vacancies"; // 🚀 Substitua pela URL real

const VagasContext = createContext<VacancyContextProps | undefined>(undefined);

export const VagasProvider = ({ children }: { children: ReactNode }) => {
  const [vacancies, set_vacancies] = useState<Vacancy[]>([]);

  /**
   * Fetch all vacancies from the backend and update state.
   */
  const loadVacancies = async () => {
    try {
      const response = await axios.get(API_URL);
      const validatedVacancies = vacancySchema.array().parse(response.data); // 🔥 Validando com o schema
      set_vacancies(validatedVacancies);
    } catch (error) {
      console.error('Error loading vacancies from backend:', error);
    }
  };

  /**
   * Create a new vacancy in the backend and update state.
   * @param newVacancy - The vacancy to be added.
   */
  const add_vacancy = async (newVacancy: Vacancy) => {
    try {
      const sanitizedVacancy = sanitizeVacancy(newVacancy); // 🔥 Sanitiza a vaga antes de enviar para a API
      const response = await axios.post(API_URL, sanitizedVacancy);
      const validatedVacancy = vacancySchema.parse(response.data); // 🔥 Validando resposta
      set_vacancies((prevVacancies) => [...prevVacancies, validatedVacancy]);
      console.log('New vacancy added:', validatedVacancy);
    } catch (error) {
      console.error('Error adding vacancy:', error);
    }
  };

  /**
   * Update an existing vacancy in the backend and update state.
   * @param id - The ID of the vacancy to update.
   * @param updates - The updated vacancy fields.
   */
  const update_vacancy = async (id: number, updates: Partial<Vacancy>) => {
    try {
      const existingVacancy = vacancies.find((vacancy) => vacancy.id === id);
      if (!existingVacancy) {
        console.error(`Vacancy with ID ${id} not found.`);
        return;
      }

      // Merge existing vacancy with updates to ensure all required fields are provided
      const updatedVacancy: Vacancy = {
        ...existingVacancy,
        ...updates,
        quantity: updates.quantity ?? existingVacancy.quantity, // Ensure 'quantity' is not undefined
      };

      const sanitizedUpdatedVacancy = sanitizeVacancy(updatedVacancy); // 🔥 Sanitiza antes de enviar
      const response = await axios.put(`${API_URL}/${id}`, sanitizedUpdatedVacancy);
      const validatedVacancy = vacancySchema.parse(response.data); // 🔥 Validando resposta

      set_vacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => (vacancy.id === id ? validatedVacancy : vacancy))
      );
      console.log(`Vacancy ${id} updated.`);
    } catch (error) {
      console.error(`Error updating vacancy ${id}:`, error);
    }
  };

  /**
   * Delete a vacancy in the backend and update state.
   * @param id - The ID of the vacancy to remove.
   */
  const remove_vacancy = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set_vacancies((prevVacancies) => prevVacancies.filter((vacancy) => vacancy.id !== id));
      console.log(`Vacancy ${id} removed.`);
    } catch (error) {
      console.error(`Error removing vacancy ${id}:`, error);
    }
  };

  /**
   * Fetch vacancies when the component is mounted.
   */
  useEffect(() => {
    loadVacancies();
  }, []);

  return (
    <VagasContext.Provider
      value={{ vacancies, set_vacancies, add_vacancy, update_vacancy, remove_vacancy }}
    >
      {children}
    </VagasContext.Provider>
  );
};

/**
 * Custom hook to access the Vacancies context.
 */
export const useVagasContext = () => {
  const context = useContext(VagasContext);
  if (!context) {
    throw new Error('useVagasContext must be used within a VagasProvider');
  }
  return context;
};
