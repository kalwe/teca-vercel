'use client'

import { z } from 'zod';

export const addressSchema = z.object({
  street: z
    .string()
    .max(255, "The street name must not exceed 255 characters")
    .nonempty("Street name is required"),
  number: z
    .string()
    .max(8, "The street number must not exceed 8 characters")
    .nonempty("Street number is required"),
  neighborhood: z
    .string()
    .max(120, "The neighborhood name must not exceed 120 characters")
    .nonempty("Neighborhood name is required"),
  city: z
    .string()
    .max(255, "The city name must not exceed 255 characters")
    .nonempty("City name is required"),
  zip_code: z
    .string()
    .max(12, "The ZIP code must not exceed 12 characters")
    .regex(/^\d{5}-\d{3}$/, "The ZIP code must be in the format XXXXX-XXX")
    .nonempty("ZIP code is required"),
  state: z
    .string()
    .max(60, "The state name must not exceed 60 characters")
    .nonempty("State name is required"),
});
