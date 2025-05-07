'use server';

import { z } from 'zod';
import db from '@/db/drizzle';
import { ChangePasswordSchema } from './page';
import { confirmPasswordSchema } from '@/validation';
import { auth } from '@/auth';
import { users } from '@/db/usersSchema';
import { eq } from 'drizzle-orm';
import { compare, hash } from 'bcryptjs';

export async function changePassword(formData: ChangePasswordSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: true,
      message: 'You must be logged in to change your password',
    };
  }

  const validate = z
    .object({
      currentPassword: z
        .string()
        .min(1, { message: 'Current password is required' }),
    })
    .and(confirmPasswordSchema);
  const validated = validate.safeParse(formData);

  if (!validated.success) {
    return {
      error: true,
      message: validated.error.issues[0].message ?? `An error occurred`,
    };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(session.user.id)));

  if (!user) {
    return {
      error: true,
      message: 'User not found',
    };
  }

  const passwordMatch = await compare(
    validated.data.currentPassword,
    user.password
  );

  if (!passwordMatch) {
    return {
      error: true,
      message: 'Current password is incorrect',
    };
  }

  const hashedPassword = await hash(validated.data.password, 10);

  try {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, Number(session.user.id)));
  } catch (error) {
    return {
      error: true,
      message: 'An error occurred while updating your password',
    };
  }
}
