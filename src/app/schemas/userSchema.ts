import { z } from "zod";
import axios from "axios";

// 🔹 URL base da API (substitua pelo seu endpoint real)
const API_URL = "https://api.example.com/users"; // 🚀 Altere conforme necessário

// 🔹 Base Schema (simula BaseModel do Pydantic)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0), // 🔥 Garante que `id` seja um número válido ou 0
});

// 🔹 Email validation mixin (sanitizado)
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
    .array(z.string().trim().toLowerCase()) // 🔥 Garante que os papéis sejam strings limpas
    .optional(),
});

// 🔹 Schema para criação de usuário (inclui email e senha) 🚀
export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    password: z.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .strict();

// 🔹 Schema para retorno de usuário (sem senha) 🚀
export const userOutputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    active: z.boolean().default(true), // ✅ Define um valor padrão para evitar erro
  });

// 🔹 Schema para usuários excluídos (Soft Delete) 🚀
export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(), // 🔥 Permite `null`
});

export type UserFormProps = {
  mode: "create" | "edit";
  userData: z.infer<typeof userInputSchema>; // ✅ Agora o tipo é inferido corretamente
  setUserData: React.Dispatch<React.SetStateAction<z.infer<typeof userInputSchema>>>;
  isEditable: boolean;
  onSave: (data: z.infer<typeof userInputSchema>) => Promise<void>;
  onCancel: () => void;
};


// =================================================
// 🔹 API Service utilizando `axios` (CRUD completo) 🚀
// =================================================

export const UserService = {
  // 🔹 Criar usuário (POST)
  async createUser(userData: z.infer<typeof userInputSchema>) {
    const validatedData = userInputSchema.parse(userData);
    const response = await axios.post(`${API_URL}`, validatedData);
    return userOutputSchema.parse(response.data); // Validação da resposta
  },

  // 🔹 Buscar todos os usuários (GET)
  async getUsers() {
    const response = await axios.get(API_URL);
    return z.array(userOutputSchema).parse(response.data); // Validação da resposta
  },

  // 🔹 Buscar usuário por ID (GET)
  async getUserById(userId: number) {
    const response = await axios.get(`${API_URL}/${userId}`);
    return userOutputSchema.parse(response.data); // Validação da resposta
  },

  // 🔹 Atualizar usuário (PUT)
  async updateUser(userId: number, userData: Partial<z.infer<typeof userInputSchema>>) {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return userOutputSchema.parse(response.data); // Validação da resposta
  },

  // 🔹 Excluir usuário (DELETE)
  async deleteUser(userId: number) {
    await axios.delete(`${API_URL}/${userId}`);
    return { success: true, message: "Usuário excluído com sucesso!" };
  },
};
