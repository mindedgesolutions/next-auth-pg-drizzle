import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(1, { message: 'Password is required' })
  .min(3, { message: 'Password must be at least 3 characters long' });

export const confirmPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

export const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Invalid email' });
