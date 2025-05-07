'use server';

import { z } from 'zod';
import { LoginFormSchema } from './page';
import { signIn, signOut } from '@/auth';

export async function loginWithCredentials(formData: LoginFormSchema) {
  const formSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  });
  const loginValidation = formSchema.safeParse(formData);

  if (!loginValidation.success) {
    return {
      error: true,
      message: loginValidation.error.issues[0].message ?? `An error occurred`,
    };
  }
  const { username, password } = formData;

  try {
    await signIn('credentials', { username, password, redirect: false });
  } catch (error: any) {
    return {
      error: true,
      message: 'Incorrect credentials',
    };
  }
}

export async function logoutUser() {
  await signOut({ redirect: false });
}
