
import { reminderSchema } from "../schemas/reminderSchema";
import api from "./api";

const endpoint = '/reminder'

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

   */
   async createReminder(reminderData: ReminderInput) {
    try {
      const response = await api.post(endpoint, reminderData, {
        validateStatus: status => status === 201,
      });
      return response.data
    } catch (error) {
      console.error(" Erro ao criar lembrete:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao criar lembrete");
    }
  },

  async getAllReminders() {
    try {
      const response = await api.get(endpoint, {
        validateStatus: status => status === 200,
      });
      return response.data
    } catch (error) {
      console.error(" Erro ao buscar todos os lembretes:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erro ao buscar lembretes");
    }
  },

};
