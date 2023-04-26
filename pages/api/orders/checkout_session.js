import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import onError from '@/server/middleware/errors';
import { isAuthenticatedUser } from '@/server/middleware/auth';
import { checkoutSession } from '@/server/controllers/orderController';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(checkoutSession);

export default handler;
