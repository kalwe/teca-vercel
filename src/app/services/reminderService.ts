
import { reminderSchema } from "../schemas/reminderSchema";
import  {z} from 'zod'
import {axios} from 'axios'

const API_URL = "https://api.example.com/reminders";

//  Schema para retorno de lembrete (caso haja campos que a API retorne diferentes)
export const reminderOutputSchema = reminderSchema.extend({
  createdAt: z.string().optional(), //  Caso a API retorne a data de criação
});

//  Tipo inferido do schema
export type ReminderInput = z.infer<typeof reminderSchema>;
export type ReminderOutput = z.infer<typeof reminderOutputSchema>;

//  Sanitização dos dados antes do envio
export const sanitizeReminder = (data): ReminderInput => {
  return reminderSchema.parse({
    id: data.id ?? undefined, // Se não existir, deixa undefined
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


export const ReminderService = {
   /**
   *  Cria um novo lembrete com validação
   * @param {ReminderInput} reminderData - Dados do lembrete
   * @returns {Promise<ReminderOutput>} - Resposta validada da API
   */
   async createReminder(reminderData: ReminderInput): Promise<ReminderOutput> {
    try {
      const validatedData = sanitizeReminder(reminderData);

      const response = await axios.post(API_URL, validatedData, {
        validateStatus: status => status === 201,
      });

      return reminderOutputSchema.parse(response.data);
    } catch (error) {
      console.error(" Erro ao criar lembrete:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar lembrete");
    }
  },

  /**
   * @param {number} id - ID do lembrete
   * @returns {Promise<ReminderOutput>} - Dados validados do lembrete
   */
  async getReminderById(id: number): Promise<ReminderOutput> {
    if (!id) throw new Error("ID inválido fornecido para buscar lembrete.");
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        validateStatus: status => status === 200,
      });

      return reminderOutputSchema.parse(response.data);
    } catch (error) {
      console.error(" Erro ao buscar lembrete:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar lembrete");
    }
  },

  /**
   *  Obtém todos os lembretes com validação
   * @returns {Promise<ReminderOutput[]>} - Lista validada de lembretes
   */
  async getAllReminders(): Promise<ReminderOutput[]> {
    try {
      const response = await axios.get(API_URL, {
        validateStatus: status => status === 200,
      });

      return z.array(reminderOutputSchema).parse(response.data);
    } catch (error) {
      console.error(" Erro ao buscar todos os lembretes:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar lembretes");
    }
  },

  /**
   *  Atualiza um lembrete existente com validação
   * @param {number} id - ID do lembrete
   * @param {Partial<ReminderInput>} reminderData - Novos dados do lembrete
   * @returns {Promise<ReminderOutput>} - Dados atualizados e validados
   */
  async updateReminder(id: number, reminderData: Partial<ReminderInput>): Promise<ReminderOutput> {
    if (!id) throw new Error("ID inválido fornecido para atualizar lembrete.");
    try {
      const validatedData = sanitizeReminder(reminderData);

      const response = await axios.put(`${API_URL}/${id}`, validatedData, {
        validateStatus: status => status === 200,
      });

      return reminderOutputSchema.parse(response.data);
    } catch (error) {
      console.error(" Erro ao atualizar lembrete:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao atualizar lembrete");
    }
  },

  /**
   *  Exclui um lembrete pelo ID
   * @param {number} id - ID do lembrete a ser removido
   * @returns {Promise<void>} - Confirmação da exclusão (204 No Content)
   */
  async deleteReminder(id: number): Promise<void> {
    if (!id) throw new Error("ID inválido fornecido para deletar lembrete.");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        validateStatus: status => status === 204,
      });

      // Retorno void porque `204 No Content` não tem corpo de resposta
    } catch (error) {
      console.error(" Erro ao deletar lembrete:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao deletar lembrete");
    }
  },
};
