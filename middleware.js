import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware(req) {
  // authorize roles
});

export const config = {
  matcher: ['/me'], // this is now a protected route that next auth recognizes
};
