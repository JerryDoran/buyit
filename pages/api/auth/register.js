import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { registerUser } from '@/server/controllers/authController';
import onError from '@/server/middleware/errors';

const handler = nc({ onError });

dbConnect();

handler.post(registerUser);

export default handler;
