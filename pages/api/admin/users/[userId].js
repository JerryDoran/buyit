import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import onError from '@/server/middleware/errors';
import { authorizeRoles, isAuthenticatedUser } from '@/server/middleware/auth';
import {
  getAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from '@/server/controllers/authController';

const handler = nc({ onError });

dbConnect();

// I can put in multiple roles in the authorizeRoles middleware function.
// i.e, => authorizeRoles('admin', 'manager', 'supervisor')
handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getAdminUser);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateAdminUser);
handler
  .use(isAuthenticatedUser, authorizeRoles('admin'))
  .delete(deleteAdminUser);

export default handler;
