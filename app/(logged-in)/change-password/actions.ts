'use server';

import { z } from 'zod';
import db from '@/db/drizzle';
import { ChangePasswordSchema } from './page';
import { confirmPasswordSchema } from '@/validation';

export async function changePassword(formData: ChangePasswordSchema) {
  const validate = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: 'Current password is required' }),
    })
    .and(confirmPasswordSchema);
  const validated = validate.safeParse(formData);
}
