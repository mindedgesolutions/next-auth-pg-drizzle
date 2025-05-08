// 'use server';

import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import TwoFactorAuthForm from './two-factor-auth-form';
import { currentUser } from './actions';

export default async function MyAccountPage() {
  const session = await auth();

  const user = (await currentUser()) as UserProps;

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>My account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <Label>Name: </Label>
          <div className="text-muted-foreground text-sm">
            {session?.user?.name}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <Label>Email: </Label>
          <div className="text-muted-foreground text-sm">
            {session?.user?.email}
          </div>

          <TwoFactorAuthForm active={user.twoFactorActivated!} />
        </div>
      </CardContent>
    </Card>
  );
}
