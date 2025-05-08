interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
  twoFactorSecret: string | null;
  twoFactorActivated: boolean | null;
  createdAt: Date | null;
}
