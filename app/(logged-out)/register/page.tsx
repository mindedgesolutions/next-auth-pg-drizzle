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
import { confirmPasswordSchema, emailSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from './actions';
import { toast } from 'sonner';
import Link from 'next/link';

// --------------------------------------

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: emailSchema,
  })
  .and(confirmPasswordSchema);
export type FormSchema = z.infer<typeof formSchema>;

// --------------------------------------

export default function RegisterPage() {
  const form = useForm<FormSchema>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: FormSchema) => {
    const response = await registerUser(data);

    if (response?.error) {
      return toast.error(response.message);
    }
  };

  return (
    <main className="max-w-4xl mx-auto flex h-screen items-center justify-center">
      {form.formState.isSubmitSuccessful ? (
        <>
          <Card>
            <CardContent>
              <p className="text-green-500">Account is created successfully</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/login`}>Login to Your Account</Link>
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Name" type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Confirm password"
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
                  Register
                </Button>
              </CardFooter>
              <div className="mt-4 text-center text-muted-foreground text-sm">
                <p>
                  Have an account?{' '}
                  <Link
                    href={`/login`}
                    className="text-green-500 hover:text-green-400 hover:underline"
                  >
                    Login
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
