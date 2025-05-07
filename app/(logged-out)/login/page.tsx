'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import Link from 'next/link';
import { loginWithCredentials } from './actions';
import { useRouter } from 'next/navigation';

// --------------------------------------

export const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;

// --------------------------------------

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    mode: 'all',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginFormSchema) => {
    const response = await loginWithCredentials(data);

    if (response?.error) {
      return toast.error(response.message ?? 'An error occurred');
    }
    toast.success('Logged in successfully');
    router.push('/my-account');
  };

  return (
    <main className="max-w-4xl mx-auto flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
            <CardContent>
              <fieldset
                disabled={form.formState.isSubmitting}
                className="grid w-full items-center gap-4"
              >
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Username"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Password"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Login
              </Button>
            </CardFooter>
            <div className="mt-4 flex flex-col gap-2 text-center text-muted-foreground text-sm">
              <p>
                Doesn't have an account?{' '}
                <Link
                  href={`/register`}
                  className="text-green-500 hover:text-green-400 hover:underline"
                >
                  Register
                </Link>
              </p>
              <p>
                Forgot password?{' '}
                <Link
                  href={`/forgot-password`}
                  className="text-green-500 hover:text-green-400 hover:underline"
                >
                  Click to reset
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </main>
  );
}
