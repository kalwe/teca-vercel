import axios from "../utils/axiosInstance";
import { HoursBank } from "../types/hoursBank";
import { hoursBankSchema } from "../schemas/hoursBankSchema";

/**
 * Service to handle Hours Bank API calls
 */
export const HoursBankService = {
  /**
   * Fetch all hours bank records from the API
   * @returns {Promise<HoursBank[]>} - List of hours bank records
   */
  async getAllHours(): Promise<HoursBank[]> {
    try {
      const response = await axios.get("/hoursbank");

      // ✅ Validating and sanitizing the response data
      return response.data.map((entry: unknown) => hoursBankSchema.parse(entry));
    } catch (error) {
      console.error("⚠ Error fetching hours bank records:", error);
      throw new Error("Failed to fetch hours bank records");
    }
  },

  /**
   * Create a new hours bank entry
   * @param {HoursBank} hoursData - Hours bank data validated by schema
   * @returns {Promise<HoursBank>} - Created hours bank entry
   */
  async createHours(hoursData: HoursBank): Promise<HoursBank> {
    try {
      // ✅ Validate and sanitize input data before sending
      const validatedData = hoursBankSchema.parse(hoursData);

      const response = await axios.post("/hoursbank", validatedData);
      return hoursBankSchema.parse(response.data);
    } catch (error) {
      console.error("⚠ Error creating hours bank entry:", error);
      throw new Error("Failed to create hours bank entry");
    }
  },

  /**
   * Update an existing hours bank entry by ID
   * @param {number} id - ID of the hours bank entry
   * @param {Partial<HoursBank>} hoursData - Updated data
   * @returns {Promise<HoursBank>} - Updated hours bank entry
   */
  async updateHours(id: number, hoursData: Partial<HoursBank>): Promise<HoursBank> {
    try {
      // ✅ Validate only the updated fields before sending
      const validatedData = hoursBankSchema.partial().parse(hoursData);

      const response = await axios.put(`/hoursbank/${id}`, validatedData);
      return hoursBankSchema.parse(response.data);
    } catch (error) {
      console.error("⚠ Error updating hours bank entry:", error);
      throw new Error("Failed to update hours bank entry");
    }
  },

  /**
   * Delete an hours bank entry by ID
   * @param {number} id - ID of the hours bank entry
   * @returns {Promise<void>} - No return value on success
   */
  async deleteHours(id: number): Promise<void> {
    try {
      await axios.delete(`/hoursbank/${id}`);
    } catch (error) {
      console.error("⚠ Error deleting hours bank entry:", error);
      throw new Error("Failed to delete hours bank entry");
    }
  },
};
