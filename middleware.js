import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware(req) {
  // authorize roles
});

// this is now a protected route that next auth recognizes.  it will protect all routes after '/me'
export const config = {
  matcher: ['/me/:path*'],
};
