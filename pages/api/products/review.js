import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { createProductReview } from '@/server/controllers/productController';
import onError from '@/server/middleware/errors';
import { isAuthenticatedUser } from '@/server/middleware/auth';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(createProductReview);

export default handler;
