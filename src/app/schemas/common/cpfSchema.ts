import { z } from 'zod';

export const cpfSchema = z
  .string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido')
  .refine(
    (cpf) => {
      const numeros = cpf.replace(/\D/g, '');
      return numeros.length === 11;
    },
    {
      message: 'CPF deve conter exatamente 11 dígitos numéricos',
    },
  );
