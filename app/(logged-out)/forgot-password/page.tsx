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
import { useRouter, useSearchParams } from 'next/navigation';
import { forgotPassword } from './actions';

// --------------------------------------

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// --------------------------------------

export default function ForgotPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get(decodeURIComponent('e')) || '';

  const form = useForm<ForgotPasswordSchema>({
    mode: 'all',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const handleSubmit = async (data: ForgotPasswordSchema) => {
    const response = await forgotPassword(data);
  };

  return (
    <main className="max-w-4xl mx-auto flex h-screen items-center justify-center">
      {form.formState.isSubmitSuccessful ? (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Email sent!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              If you have an account with us, we have sent you a password reset
              link to your email address.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Email" type="text" />
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
                  Forgot Password
                </Button>
              </CardFooter>
              <div className="mt-4 flex flex-col gap-2 text-center text-muted-foreground text-sm">
                <p>
                  Forget it! Back to{' '}
                  <Link
                    href={`/login`}
                    className="text-green-500 hover:text-green-400 hover:underline"
                  >
                    Login
                  </Link>
                </p>
                <p>
                  Don't have an account?{' '}
                  <Link
                    href={`/register`}
                    className="text-green-500 hover:text-green-400 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </Card>
      )}
    </main>
  );
}
