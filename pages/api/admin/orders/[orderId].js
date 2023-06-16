import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import onError from '@/server/middleware/errors';
import { authorizeRoles, isAuthenticatedUser } from '@/server/middleware/auth';
import {
  getAdminOrder,
  updateAdminOrder,
  deleteAdminOrder,
} from '@/server/controllers/orderController';

const handler = nc({ onError });

dbConnect();

// I can put in multiple roles in the authorizeRoles middleware function.
// i.e, => authorizeRoles('admin', 'manager', 'supervisor')
handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getAdminOrder);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateAdminOrder);
handler
  .use(isAuthenticatedUser, authorizeRoles('admin'))
  .delete(deleteAdminOrder);

export default handler;
