'use server';

import { z } from 'zod';
import { FormSchema } from './page';
import { confirmPasswordSchema, emailSchema } from '@/validation';
import { hash } from 'bcryptjs';
import db from '@/db/drizzle';
import { users } from '@/db/usersSchema';

export async function registerUser(formData: FormSchema) {
  const formSchema = z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      email: emailSchema,
    })
    .and(confirmPasswordSchema);
  const newUserValidation = formSchema.safeParse(formData);

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0].message ?? `An error occurred`,
    };
  }
  const { name, email, password } = formData;
  const hashPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      name,
      email,
      password: hashPassword,
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return {
        error: true,
        message: 'Email already exists',
      };
    }
    return {
      error: true,
      message: 'An error occurred',
    };
  }
}
