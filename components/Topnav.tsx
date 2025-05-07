import Link from 'next/link';
import LogoutBtn from './LogoutBtn';
import { Button } from './ui/button';

const Topnav = () => {
  return (
    <div className="p-4 bg-gray-200">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center w-full">
        <ul className="flex space-x-0">
          <li>
            <Button
              size={'sm'}
              variant={'link'}
              asChild
              className="hover:no-underline text-muted-foreground hover:text-primary/80"
            >
              <Link href={`/my-account`}>My Account</Link>
            </Button>
          </li>
          <li>
            <Button
              size={'sm'}
              variant={'link'}
              asChild
              className="hover:no-underline text-muted-foreground hover:text-primary/80"
            >
              <Link href={`/change-password`}>Change Password</Link>
            </Button>
          </li>
        </ul>
        <LogoutBtn />
      </div>
    </div>
  );
};
export default Topnav;
