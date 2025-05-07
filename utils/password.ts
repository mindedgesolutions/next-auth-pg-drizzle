import { compare } from 'bcryptjs';

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}
