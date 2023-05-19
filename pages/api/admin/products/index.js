import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import onError from '@/server/middleware/errors';
import { authorizeRoles, isAuthenticatedUser } from '@/server/middleware/auth';
import { createProduct } from '@/server/controllers/productController';

const handler = nc({ onError });

dbConnect();

// I can put in multiple roles in the authorizeRoles middleware function.
// i.e, => authorizeRoles('admin', 'manager', 'supervisor')
handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(createProduct);

export default handler;
