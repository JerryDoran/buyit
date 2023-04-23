import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { updatePassword } from '@/server/controllers/authController';
import onError from '@/server/middleware/errors';
import { isAuthenticatedUser } from '@/server/middleware/auth';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updatePassword);

export default handler;
