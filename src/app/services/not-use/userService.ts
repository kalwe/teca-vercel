import axios from "../utils/axiosInstance";
import { UserOutput, UserInput } from "../types/user";
import { userOutputSchema } from "../schemas/userSchema";

export const UserService = {
  /**
   * Fetch all users from API
   */
  async getAllUsers(): Promise<UserOutput[]> {
    const response = await axios.get("/users");
    return response.data.map((user: unknown) => userOutputSchema.parse(user));
  },

  /**
   * Fetch a single user by ID
   */
  async getUserById(id: number): Promise<UserOutput | null> {
    try {
      const response = await axios.get(`/users/${id}`);
      return userOutputSchema.parse(response.data); // ✅ Valida com Zod antes de retornar
    } catch (error) {
      console.error(`⚠ Erro ao buscar usuário com ID ${id}:`, error);
      return null; // ✅ Retorna `null` se o usuário não for encontrado
    }
  },

  /**
   * Create a new user
   */
  async createUser(userData: UserInput): Promise<UserOutput> {
    const response = await axios.post("/users", userData);
    return userOutputSchema.parse({
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "roles": ["admin", "editor"],
      "created_at": "2024-02-05T10:00:00",
      "updated_at": null,
      "is_active": true,
      "deleted_at": null,
      "version": 1
    });
  },

  /**
   * Update user by ID
   */
  async updateUser(id: number, userData: Partial<UserInput>): Promise<UserOutput> {
    const response = await axios.put(`/users/${id}`, userData);
    return userOutputSchema.parse(response.data);
  },

  /**
   * Delete user by ID
   */
  async deleteUser(id: number): Promise<void> {
    await axios.delete(`/users/${id}`);
  },

  /**
   * 🔥 Login Function - Authenticates user with email and password
   */
  async login(email: string, password: string): Promise<UserOutput | null> {
    try {
      const response = await axios.post("/auth/login", { email, password });
      return userOutputSchema.parse(response.data);
    } catch (error) {
      console.error("⚠ Erro no login:", error);
      return null;
    }
  }
};
