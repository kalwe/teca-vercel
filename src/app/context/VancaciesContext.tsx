'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios'; // FIXME: use api.ts
import { vacancySchema, Vacancy } from '@/app/schemas/vacancySchema'; // 🔥 Importando o schema principal

const API_URL = "https://api.example.com/vacancies"; // 🚀 Substitua pela URL real

interface VacancyContextProps {
  vacancies: Vacancy[];
  setVacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
  addVacancy: (vacancy: Vacancy) => Promise<void>;
  updateVacancy: (id: number, updates: Partial<Vacancy>) => Promise<void>;
  removeVacancy: (id: number) => Promise<void>;
}

const VacancyContext = createContext<VacancyContextProps | undefined>(undefined);

export const VacancyProvider = ({ children }: { children: ReactNode }) => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  /**
   * Fetch all vacancies from the backend and update state.
   */
  const loadVacancies = async () => {
    try {
      const response = await axios.get(API_URL);
      const validatedVacancies = response.data.map((vacancy) =>
        vacancySchema.parse(vacancy)
      ); // Validando com o schema principal
      setVacancies(validatedVacancies);
    } catch (error) {
      console.error('Error loading vacancies:', error);
    }
  };

  /**
   * Create a new vacancy in the backend and update state.
   * @param newVacancy - The vacancy to be added.
   */
  const addVacancy = async (newVacancy: Vacancy) => {
    try {
      const validatedVacancy = vacancySchema.parse(newVacancy); // 🔥 Validando antes de enviar
      const response = await axios.post(API_URL, validatedVacancy);
      setVacancies((prev) => [...prev, vacancySchema.parse(response.data)]);
      console.log('New vacancy added:', response.data);
    } catch (error) {
      console.error('Error adding vacancy:', error);
    }
  };

  /**
   * Update an existing vacancy in the backend and update state.
   * @param id - The ID of the vacancy to update.
   * @param updates - The updated vacancy fields.
   */
  const updateVacancy = async (id: number, updates: Partial<Vacancy>) => {
    try {
      const existingVacancy = vacancies.find((vacancy) => vacancy.id === id);
      if (!existingVacancy) {
        console.error(`Vacancy with ID ${id} not found.`);
        return;
      }

      // Merge existing vacancy with updates
      const updatedVacancy = { ...existingVacancy, ...updates };
      const validatedVacancy = vacancySchema.parse(updatedVacancy); // Validando antes de enviar

      const response = await axios.put(`${API_URL}/${id}`, validatedVacancy);
      setVacancies((prev) =>
        prev.map((vacancy) => (vacancy.id === id ? vacancySchema.parse(response.data) : vacancy))
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
  const removeVacancy = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setVacancies((prev) => prev.filter((vacancy) => vacancy.id !== id));
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
    <VacancyContext.Provider value={{ vacancies, setVacancies, addVacancy, updateVacancy, removeVacancy }}>
      {children}
    </VacancyContext.Provider>
  );
};

/**
 * Custom hook to access the Vacancies context.
 */
export const useVacancyContext = () => {
  const context = useContext(VacancyContext);
  if (!context) {
    throw new Error('useVacancyContext must be used within a VacancyProvider');
  }
  return context;
};
