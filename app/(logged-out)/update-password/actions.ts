'use server';

import { auth } from '@/auth';
import db from '@/db/drizzle';
import { passwordResetToken } from '@/db/passwordResetTokenSchema';
import { users } from '@/db/usersSchema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

export async function checkTokenValidity(token: string) {
  const now = Date.now();
  const [tokenData] = await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token));
  if (!tokenData) return false;

  return !!tokenData.tokenExpiry && tokenData.tokenExpiry.getTime() > now;
}

export async function updatePassword({
  token,
  password,
  confirmPassword,
}: {
  token: string;
  password: string;
  confirmPassword: string;
}) {
  const session = await auth();

  if (session?.user?.id) {
    return {
      error: true,
      message:
        'You are already logged in. Please log out before changing your password.',
    };
  }

  const isValid = await checkTokenValidity(token);

  if (!isValid) {
    return {
      error: true,
      message: 'Invalid or expired token.',
    };
  }

  const hashedPassword = await hash(password, 10);

  const [user] = await db
    .select({ userId: passwordResetToken.userId })
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token));

  if (user) {
    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, Number(user.userId)));

    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.token, token));
  }
}
