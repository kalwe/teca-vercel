import { z } from 'zod';

// 🔹 Schema de lembrete (Reminders)
// reminderSchema.ts
export const reminderSchema = z.object({
  date: z.string().min(1, 'A data é obrigatória'),
  time: z.string().min(1, 'O horário é obrigatório'),
  reason: z.string().min(1, 'O motivo é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
});

export type ReminderInput = z.infer<typeof reminderSchema>;
