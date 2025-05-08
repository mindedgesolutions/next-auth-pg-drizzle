import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { checkTokenValidity } from './actions';
import UpdatePasswordForm from './update-password-form';

export default async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  let tokenValid = false;
  const { e } = await searchParams;

  if (e) tokenValid = await checkTokenValidity(e);

  return (
    <main className="max-w-4xl mx-auto flex h-screen items-center justify-center">
      {tokenValid ? (
        <UpdatePasswordForm token={e as string} />
      ) : (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">
              Your password link is invalid or has expired
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/forgot-password`}>Password reset</Link>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
