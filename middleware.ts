export { auth as middleware } from '@/auth';

export const config = {
  matcher: ['/protected-path/:path*'],
  runtime: 'nodejs',
};
