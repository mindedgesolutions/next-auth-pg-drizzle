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
import { confirmPasswordSchema } from '@/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { updatePassword } from '../actions';
import { useRouter } from 'next/navigation';

// --------------------------------------

const changePasswordSchema = z.object({}).and(confirmPasswordSchema);
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

// --------------------------------------

export default function UpdatePasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const form = useForm<ChangePasswordSchema>({
    mode: 'all',
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: ChangePasswordSchema) => {
    const response = await updatePassword({ ...data, token });

    if (response?.error) return toast.error(response.message);

    toast.success('Password updated successfully!');
    router.push('/login');
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Change Password</CardTitle>
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="New password"
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
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
