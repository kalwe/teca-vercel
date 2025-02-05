'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vacancy, VacancyContextProps } from '../types/vacancyType';
import { VacancyService } from '@/app/services/vacancyService';

const VagasContext = createContext<VacancyContextProps | undefined>(undefined);

export const VagasProvider = ({ children }: { children: ReactNode }) => {
  const [vacancies, set_vacancies] = useState<Vacancy[]>([]);

  /**
   * Fetch all vacancies from the backend and update state.
   */
  const loadVacancies = async () => {
    try {
      const fetchedVacancies = await VacancyService.getAllVacancies();
      if (fetchedVacancies) {
        set_vacancies(fetchedVacancies);
      }
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
      const createdVacancy = await VacancyService.createVacancy(newVacancy);
      set_vacancies((prevVacancies) => [...prevVacancies, createdVacancy]);
      console.log('New vacancy added:', createdVacancy);
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

      const responseVacancy = await VacancyService.updateVacancy(id, updatedVacancy);
      set_vacancies((prevVacancies) =>
        prevVacancies.map((vacancy) => (vacancy.id === id ? responseVacancy : vacancy))
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
      await VacancyService.deleteVacancy(id);
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
