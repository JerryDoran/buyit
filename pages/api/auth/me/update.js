import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { updateUser } from '@/server/controllers/authController';
import onError from '@/server/middleware/errors';
import upload from '@/server/lib/multer';
import { isAuthenticatedUser } from '@/server/middleware/auth';

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array('avatar');

handler.use(isAuthenticatedUser, uploadMiddleware).put(updateUser);

export default handler;
