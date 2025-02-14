import { z } from "zod"
import axios from "axios"

const API_URL = "https://api.example.com/users" // 🚀 Altere conforme necessário

// Base Schema (simula BaseModel do Pydantic)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0), // Garante que `id` seja um número válido ou 0
})

// Email validation mixin (sanitizado)
export const emailMixinSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("O email deve ser válido.")
    .max(255, "O email não pode ter mais de 255 caracteres."),
})

// User Base Schema (sem email e senha)
export const userBaseSchema = baseSchema.extend({
  name: z
    .string()
    .trim()
    .min(5, "O nome deve ter pelo menos 5 caracteres.")
    .max(80, "O nome não pode ter mais de 80 caracteres."),
  roles: z
    .array(z.string().trim().toLowerCase()) // Garante que os papéis sejam strings limpas
    .optional(),
})

// Schema para criação de usuário (`UserInput`)
export const userInputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    password: z.string().trim().min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .strict()

// Schema para saída de usuário (`UserOutput`)
export const userOutputSchema = userBaseSchema
  .merge(emailMixinSchema)
  .extend({
    active: z.boolean().default(true), // Define um valor padrão para evitar erro
  })

// Schema para usuários excluídos (Soft Delete)
export const userDeletedSchema = baseSchema.extend({
  deleted_at: z.union([z.string(), z.null()]).optional(), // Permite `null`
})

// =================================================
// API Service utilizando `axios` (CRUD completo)
// =================================================

export const UserService = {
  // Criar usuário (POST)
  async createUser(userData: z.infer<typeof userInputSchema>) { // TODO: infer aqui nao eh bom
    const validatedData = userInputSchema.parse(userData)
    const response = await axios.post(`${API_URL}`, validatedData)
    return userOutputSchema.parse(response.data) // Validação da resposta
  },

  // Buscar todos os usuários (GET)
  async getUsers() {
    const response = await axios.get(API_URL)
    return z.array(userOutputSchema).parse(response.data) // Validação da resposta
  },

  // Buscar usuário por ID (GET)
  async getUserById(userId: number) {
    const response = await axios.get(`${API_URL}/${userId}`)
    return userOutputSchema.parse(response.data) // Validação da resposta
  },

  // Atualizar usuário (PUT)
  async updateUser(userId: number, userData: Partial<z.infer<typeof userInputSchema>>) {
    const response = await axios.put(`${API_URL}/${userId}`, userData)
    return userOutputSchema.parse(response.data) // Validação da resposta
  },

  // Excluir usuário (DELETE)
  async deleteUser(userId: number) {
    await axios.delete(`${API_URL}/${userId}`)
    return { success: true, message: "Usuário excluído com sucesso!" }
  },

  // Fazer login (POST)
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password })
    return userOutputSchema.parse(response.data)
  },
}

// =================================================
// Tipagem do Contexto de Usuário (`UserContextType`)
// =================================================

export type UserContextType = {
  // TODO: remove all z.infer
  users: z.infer<typeof userOutputSchema>[]
  loggedInUser: z.infer<typeof userOutputSchema> | null
  addUser: (user: Omit<z.infer<typeof userOutputSchema>, "id" | "active"> & { password: string }) => Promise<void>
  updateUser: (id: number, updatedData: Partial<z.infer<typeof userOutputSchema>>) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}
