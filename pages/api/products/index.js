import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import {
  allProducts,
  createProduct,
} from '@/server/controllers/productController';
import onError from '@/server/middleware/errors';
import { isAuthenticatedUser } from '@/server/middleware/auth';

const handler = nc({ onError });

dbConnect();

handler.get(allProducts);
handler.use(isAuthenticatedUser).post(createProduct);

export default handler;
