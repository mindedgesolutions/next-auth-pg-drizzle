'use server';

import { z } from 'zod';
import crypto from 'crypto';
import db from '@/db/drizzle';
import { ForgotPasswordSchema } from './page';
import { users } from '@/db/usersSchema';
import { eq } from 'drizzle-orm';
import { passwordResetToken } from '@/db/passwordResetTokenSchema';
import { mailer } from '@/lib/email';

export async function forgotPassword(formData: ForgotPasswordSchema) {
  const validate = z.object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email' }),
  });
  const validated = validate.safeParse(formData);

  if (!validated.success) {
    return {
      error: true,
      message: validated.error.issues[0].message || 'Invalid email',
    };
  }

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, formData.email));

  if (!user) return;

  const token = crypto.randomBytes(32).toString('hex');
  const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await db
    .insert(passwordResetToken)
    .values({
      userId: user.id,
      token,
      tokenExpiry,
    })
    .onConflictDoUpdate({
      target: [passwordResetToken.userId],
      set: {
        token,
        tokenExpiry,
      },
    });

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/update-password?e=${token}`;

  await mailer.sendMail({
    from: 'test@resend.dev',
    subject: 'Password Reset Request',
    to: user.email,
    html: `Click the link to reset your password: ${link}`,
  });
}
