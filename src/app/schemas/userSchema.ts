import { z } from "zod";
import axios from "axios";

//  URL base da API (substitua pelo seu endpoint real)
const API_URL = "https://api.example.com/users";
const api = "/user"

//  Base Schema (simula BaseModel do Pydantic)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0),
});

//  Email validation mixin
export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("O email deve ser válido.")
    .max(255, "O email não pode ter mais de 255 caracteres."),
});

//  User Base Schema (sem email e senha)
export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .max(80, "O nome não pode ter mais de 80 caracteres."),
  roles: z
    .array(z.string().trim().toLowerCase())
    .optional(),
});

//  Schema para criação de usuário (inclui email e senha)
export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    id: z.number().min(1, "ID deve ser maior que 0").optional(),
    password: z.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .strict();

//  Schema para retorno de usuário (sem senha)
export const userOutputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    active: z.boolean().default(true),
  });

//  Schema para usuários excluídos (Soft Delete)
export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(),
});

//  Tipagem correta para o formulário
export type UserData = z.infer<typeof userInputSchema>;

export type UserFormProps = {
  mode: "create" | "edit";
  userData?: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  isEditable: boolean;
  loading: boolean; // ✅ Ensure the component supports a loading state
  onSave: (data: UserData) => Promise<void>;
  onCancel: () => void;
};

// =================================================
//  API Service utilizando `axios` (CRUD completo)
// =================================================

export const UserService = {
  // Criar usuário (POST)
  async createUser(userData: UserType) {
    try {
      const response = await api.post(endpoint, userData);
      if (response.status === 201) return response.data;

      console.error("❌ Erro ao criar usuário. Resposta inesperada:", response.status);
      return null;
    } catch (error) {
      console.error("❌ Erro ao criar usuário:", error);
      throw error;
    }
  },

  // Buscar todos os usuários (GET)
  async getUsers() {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar usuários:", error);
      throw error;
    }
  },

  // Buscar usuário por ID (GET)
  async getUserById(userId: number) {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return userOutputSchema.parse(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar usuário por ID:", error);
      throw error;
    }
  },

  // Atualizar usuário (PUT)
  async updateUser(userId: number, userData: Partial<z.infer<typeof userInputSchema>>) {
    try {
      const validatedData = userInputSchema.partial().parse(userData);
      const response = await axios.put(`${API_URL}/${userId}`, validatedData);
      return userOutputSchema.parse(response.data);
    } catch (error) {
      console.error("❌ Erro ao atualizar usuário:", error);
      throw error;
    }
  },

  // Excluir usuário (DELETE)
  async deleteUser(userId: number): Promise<boolean> {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);

      if (response.status === 200 || response.status === 204) {
        return true;
      }

      console.error(` Erro ao excluir usuário. Resposta inesperada: ${response.status}`);
      return false;
    } catch (error) {
      console.error(" Erro ao excluir usuário:", error);
      return false;
    }
  },
};
