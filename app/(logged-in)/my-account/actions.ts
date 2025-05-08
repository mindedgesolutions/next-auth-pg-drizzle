'use server';

import { auth } from '@/auth';
import db from '@/db/drizzle';
import { users } from '@/db/usersSchema';
import { eq } from 'drizzle-orm';
import { authenticator } from 'otplib';

export async function currentUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: true,
      message: 'User not found',
    };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(session.user.id)));

  return user;
}

export async function get2FaSecret() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: true, message: 'Unauthorized' };
  }

  const user = (await currentUser()) as UserProps;

  if (!user) {
    return { error: true, message: 'User not found' };
  }

  let secret = user.twoFactorSecret;

  if (!user.twoFactorSecret) {
    secret = authenticator.generateSecret();

    await db
      .update(users)
      .set({
        twoFactorSecret: secret,
        twoFactorActivated: true,
      })
      .where(eq(users.id, Number(session.user.id)));
  }

  return {
    twoFactorSecret: authenticator.keyuri(
      user.email,
      'Next Auth',
      secret as string
    ),
  };
}
