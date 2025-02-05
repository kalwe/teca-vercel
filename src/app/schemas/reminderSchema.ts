import { z } from 'zod';

export const reminderSchema = z.object({
  date: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'A data deve estar no formato dd/mm/aaaa e ser válida')
    .min(10, 'A data deve estar completa')
    .max(10, 'A data deve estar completa'),
  time: z
    .string()
    .regex(/^([01]?\d|2[0-3]):[0-5]\d$/, 'O horário deve estar no formato HH:mm')
    .min(5, 'O horário deve estar completo')
    .max(5, 'O horário deve estar completo'),
  reason: z
    .string()
    .min(3, 'O motivo deve ter no mínimo 3 caracteres')
    .max(255, 'O motivo deve ter no máximo 255 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ ]+$/, 'O motivo deve conter apenas letras'),
  description: z
  .string()
  .min(3, 'A descrição deve ter no mínimo 3 caracteres')
  .max(500, 'A descrição deve ter no máximo 500 caracteres')
  .regex(/^[a-zA-ZÀ-ÿ ]+$/, 'A descrição deve conter apenas letras'),
});

export const sanitizeReminder = (data: any) => {
  return reminderSchema.parse({
    date: data.date.trim(),
    time: data.time.trim(),
    reason: data.reason.trim(),
    description: data.description ? data.description.trim() : '',
  });
};
