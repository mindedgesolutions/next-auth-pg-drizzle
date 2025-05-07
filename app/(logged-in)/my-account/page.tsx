import { auth } from '@/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default async function MyAccountPage() {
  const session = await auth();

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <CardTitle>My account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <Label>Name: </Label>
          <div className="text-muted-foreground text-base">
            {session?.user?.name}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <Label>Email: </Label>
          <div className="text-muted-foreground text-base">
            {session?.user?.email}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
