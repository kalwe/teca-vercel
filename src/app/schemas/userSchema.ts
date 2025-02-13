import { z } from "zod";
import axios from "axios";
import { UserType, userOutputSchema, userInputSchema } from "./schemas";


//  URL base da API (substitua pelo seu endpoint real)
const API_URL = "https://api.example.com/users";


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
  /**
   * Cria um novo usuário com validação
   * @param {UserType} userData - Dados do usuário
   * @returns {Promise<UserType>} - Resposta da API validada
   */
  async createUser(userData: UserType): Promise<UserType> {
    try {
      const response = await axios.post(API_URL, userData, {
        validateStatus: status => status === 201,
      });

      return userOutputSchema.parse(response.data);
    } catch (error) {
      console.error("Erro ao criar usuário:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar usuário.");
    }
  },

  /**
   * Busca todos os usuários
   * @returns {Promise<UserType[]>} - Lista de usuários validados
   */
  async getUsers(): Promise<UserType[]> {
    try {
      const response = await axios.get(API_URL, {
        validateStatus: status => status === 200,
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar usuários.");
    }
  },

  /**
   * Busca um usuário pelo ID
   * @param {number} userId - ID do usuário
   * @returns {Promise<UserType>} - Dados do usuário validados
   */
  async getUserById(userId: number): Promise<UserType> {
    if (!userId) throw new Error("ID inválido fornecido para buscar usuário.");
    try {
      const response = await axios.get(`${API_URL}/${userId}`, {
        validateStatus: status => status === 200,
      });

      return userOutputSchema.parse(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar usuário.");
    }
  },

  /**
   * Atualiza um usuário existente com validação
   * @param {number} userId - ID do usuário
   * @param {Partial<z.infer<typeof userInputSchema>>} userData - Novos dados do usuário
   * @returns {Promise<UserType>} - Dados atualizados validados
   */
  async updateUser(userId: number, userData: Partial<z.infer<typeof userInputSchema>>): Promise<UserType> {
    if (!userId) throw new Error("ID inválido fornecido para atualizar usuário.");
    try {
      const validatedData = userInputSchema.partial().parse(userData);
      const response = await axios.put(`${API_URL}/${userId}`, validatedData, {
        validateStatus: status => status === 200,
      });

      return userOutputSchema.parse(response.data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao atualizar usuário.");
    }
  },

  /**
   * Exclui um usuário pelo ID
   * @param {number} userId - ID do usuário a ser removido
   * @returns {Promise<void>} - Confirmação da exclusão
   */
  async deleteUser(userId: number): Promise<void> {
    if (!userId) throw new Error("ID inválido fornecido para deletar usuário.");
    try {
      await axios.delete(`${API_URL}/${userId}`, {
        validateStatus: status => status === 204,
      });

      // Retorno void porque `204 No Content` não tem corpo de resposta
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao excluir usuário.");
    }
  },
};
