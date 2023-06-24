import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import onError from '@/server/middleware/errors';
import { isAuthenticatedUser } from '@/server/middleware/auth';
import { canReview } from '@/server/controllers/orderController';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(canReview);

export default handler;
