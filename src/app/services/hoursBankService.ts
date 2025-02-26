import { hoursBankSchema } from '../schemas/hoursBankSchema';
import { HoursBank } from '../types/hoursBank';
import api from './api';

export const HoursBankService = {
  async getAllHours(): Promise<HoursBank[]> {
    try {
      const response = await api.get('/hoursbank');

      return response.data.map((entry: unknown) => hoursBankSchema.parse(entry));
    } catch (error) {
      console.error('Error fetching hours bank records:', error);
      throw new Error('Failed to fetch hours bank records');
    }
  },

  async createHours(hoursData: HoursBank): Promise<HoursBank> {
    try {
      const validatedData = hoursBankSchema.parse(hoursData);
      const response = await api.post('/hoursbank', validatedData);
      return hoursBankSchema.parse(response.data);
    } catch (error) {
      console.error('Error creating hours bank entry:', error);
      throw new Error('Failed to create hours bank entry');
    }
  },

  async updateHours(id: number, hoursData: Partial<HoursBank>): Promise<HoursBank> {
    try {
      const validatedData = hoursBankSchema.partial().parse(hoursData);

      const response = await api.put(`/hoursbank/${id}`, validatedData);
      return hoursBankSchema.parse(response.data);
    } catch (error) {
      console.error('Error updating hours bank entry:', error);
      throw new Error('Failed to update hours bank entry');
    }
  },

  async deleteHours(id: number): Promise<void> {
    try {
      await api.delete(`/hoursbank/${id}`);
    } catch (error) {
      console.error('Error deleting hours bank entry:', error);
      throw new Error('Failed to delete hours bank entry');
    }
  },
};
