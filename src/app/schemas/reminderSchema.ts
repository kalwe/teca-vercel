import { z } from "zod";
import axios from "axios";

// 🔹 URL base da API (substitua pelo seu endpoint real)
const API_URL = "https://api.example.com/reminders"; // 🚀 Altere conforme necessário

// 🔹 Base Schema (pode ser reutilizado caso necessário)
export const baseSchema = z.object({
  id: z.number().int().positive().optional().default(0), // 🔥 Garante que `id` seja um número válido ou 0
});

// 🔹 Schema de lembrete (Reminders)
export const reminderSchema = baseSchema.extend({
  date: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "A data deve estar no formato dd/mm/aaaa e ser válida")
    .min(10, "A data deve estar completa")
    .max(10, "A data deve estar completa"),
  time: z
    .string()
    .regex(/^([01]?\d|2[0-3]):[0-5]\d$/, "O horário deve estar no formato HH:mm")
    .min(5, "O horário deve estar completo")
    .max(5, "O horário deve estar completo"),
  reason: z
    .string()
    .min(3, "O motivo deve ter no mínimo 3 caracteres")
    .max(255, "O motivo deve ter no máximo 255 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ ]+$/, "O motivo deve conter apenas letras"),
  description: z
    .string()
    .min(3, "A descrição deve ter no mínimo 3 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ ]+$/, "A descrição deve conter apenas letras"),
});

// 🔹 Schema para retorno de lembrete (caso haja campos que a API retorne diferentes)
export const reminderOutputSchema = reminderSchema.extend({
  createdAt: z.string().optional(), // 🔹 Caso a API retorne a data de criação
});

// 🔹 Tipo inferido do schema
export type ReminderInput = z.infer<typeof reminderSchema>;
export type ReminderOutput = z.infer<typeof reminderOutputSchema>;

// 🔹 Sanitização dos dados antes do envio
export const sanitizeReminder = (data: any): ReminderInput => {
  return reminderSchema.parse({
    id: data.id ?? undefined, // ✅ Se não existir, deixa undefined
    date: data.date.trim(),
    time: data.time.trim(),
    reason: data.reason.trim(),
    description: data.description ? data.description.trim() : "",
  });
};

export type ReminderFormProps = {
  mode: "create" | "edit";
  reminderData: ReminderInput;
  setReminderData: React.Dispatch<React.SetStateAction<ReminderInput>>;
  isEditable: boolean;
  onSave: (data: ReminderInput) => Promise<void>;
  onCancel: () => void;
  schema: typeof reminderSchema;
  sanitize: typeof sanitizeReminder;
  apiService: typeof ReminderService;
};

// =================================================
// 🔹 API Service utilizando `axios` (CRUD completo) 🚀
// =================================================

export const ReminderService = {
  /**
   * 🔥 Cria um novo lembrete com validação
   * @param {ReminderInput} reminderData - Dados do lembrete
   * @returns {Promise<ReminderOutput>} - Resposta validada da API
   */
  async createReminder(reminderData: ReminderInput): Promise<ReminderOutput> {
    try {
      const validatedData = sanitizeReminder(reminderData);
      const response = await axios.post(`${API_URL}`, validatedData);
      return reminderOutputSchema.parse(response.data);
    } catch (error) {
      console.error("❌ Erro ao criar lembrete:", error);
      throw error;
    }
  },

  /**
   * 🔍 Busca um lembrete pelo ID com validação
   * @param {number} id - ID do lembrete
   * @returns {Promise<ReminderOutput>} - Dados validados do lembrete
   */
  async getReminderById(id: number): Promise<ReminderOutput> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return reminderOutputSchema.parse(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar lembrete:", error);
      throw error;
    }
  },

  /**
   * 📜 Obtém todos os lembretes com validação
   * @returns {Promise<ReminderOutput[]>} - Lista validada de lembretes
   */
  async getAllReminders(): Promise<ReminderOutput[]> {
    try {
      const response = await axios.get(API_URL);
      return z.array(reminderOutputSchema).parse(response.data);
    } catch (error) {
      console.error("❌ Erro ao buscar todos os lembretes:", error);
      throw error;
    }
  },

  /**
   * 🔄 Atualiza um lembrete existente com validação
   * @param {number} id - ID do lembrete
   * @param {Partial<ReminderInput>} reminderData - Novos dados do lembrete
   * @returns {Promise<ReminderOutput>} - Dados atualizados e validados
   */
  async updateReminder(id: number, reminderData: Partial<ReminderInput>): Promise<ReminderOutput> {
    try {
      const validatedData = sanitizeReminder(reminderData);
      const response = await axios.put(`${API_URL}/${id}`, validatedData);
      return reminderOutputSchema.parse(response.data);
    } catch (error) {
      console.error("❌ Erro ao atualizar lembrete:", error);
      throw error;
    }
  },

  /**
   * 🗑️ Exclui um lembrete pelo ID
   * @param {number} id - ID do lembrete a ser removido
   * @returns {Promise<{ success: boolean, message: string }>} - Confirmação da exclusão
   */
  async deleteReminder(id: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao deletar lembrete:", error);
      throw error;
    }
  },
};
