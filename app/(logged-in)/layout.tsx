import { auth } from '@/auth';
import Topnav from '@/components/Topnav';
import { redirect } from 'next/navigation';

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) redirect('/login');

  return (
    <div>
      <Topnav />
      <div className="max-w-screen-xl mx-auto h-screen -mt-16 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
