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

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not authorized to access this resource`
        )
      );
    }
    next();
  };
}
