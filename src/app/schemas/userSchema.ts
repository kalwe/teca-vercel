import { z } from "zod";
import axios from "axios";

// 🔹 URL base da API (substitua pelo seu endpoint real)
const API_URL = "https://api.example.com/users";

// 🔹 Base Schema (simula BaseModel do Pydantic)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0),
});

// 🔹 Email validation mixin
export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("O email deve ser válido.")
    .max(255, "O email não pode ter mais de 255 caracteres."),
});

// 🔹 User Base Schema (sem email e senha)
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

// 🔹 Schema para criação de usuário (inclui email e senha)
export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    password: z.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .strict();

// 🔹 Schema para retorno de usuário (sem senha)
export const userOutputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    active: z.boolean().default(true),
  });

// 🔹 Schema para usuários excluídos (Soft Delete)
export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(),
});

// 🔹 Tipagem correta para o formulário
export type UserFormProps = {
  mode: "create" | "edit";
  userData?: z.infer<typeof userInputSchema>;
  setUserData: React.Dispatch<React.SetStateAction<z.infer<typeof userInputSchema>>>;
  isEditable: boolean;
  onSave: (data: z.infer<typeof userInputSchema>) => Promise<void>;
  onCancel: () => void;
};

// =================================================
// 🔹 API Service utilizando `axios` (CRUD completo)
// =================================================

export const UserService = {
  // 🔹 Criar usuário (POST)
  async createUser(userData: z.infer<typeof userInputSchema>) {
    const validatedData = userInputSchema.parse(userData);
    const response = await axios.post(`${API_URL}`, validatedData);
    return userOutputSchema.parse(response.data);
  },

  // 🔹 Buscar todos os usuários (GET)
  async getUsers(page: number) {
    const response = await axios.get(API_URL);
    return z.array(userOutputSchema).parse(response.data);
  },

  // 🔹 Buscar usuário por ID (GET)
  async getUserById(userId: number) {
    const response = await axios.get(`${API_URL}/${userId}`);
    return userOutputSchema.parse(response.data);
  },

  // 🔹 Atualizar usuário (PUT)
  async updateUser(userId: number, userData: Partial<z.infer<typeof userInputSchema>>) {
    const validatedData = userInputSchema.partial().parse(userData);
    const response = await axios.put(`${API_URL}/${userId}`, validatedData);
    return userOutputSchema.parse(response.data);
  },

  // 🔹 Excluir usuário (DELETE)
  async deleteUser(userId: number) {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.status === 200;
  },
};
