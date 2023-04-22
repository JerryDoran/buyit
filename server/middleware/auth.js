import { getSession } from 'next-auth/react';
import ErrorHandler from '../lib/errorHandler';

export async function isAuthenticatedUser(req, res, next) {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler('Login first to access this route', 401));
  }

  req.user = session.user;

  next();
}
