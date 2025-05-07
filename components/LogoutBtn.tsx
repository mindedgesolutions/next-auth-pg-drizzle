'use client';

import { logoutUser } from '@/app/(logged-out)/login/actions';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LogoutBtn = () => {
  const router = useRouter();

  const logout = async () => {
    await logoutUser();
    toast.success('Logged out successfully');
    router.push('/login');
  };
  return (
    <Button size={'sm'} onClick={logout}>
      Logout
    </Button>
  );
};
export default LogoutBtn;
