import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { uploadProductImages } from '@/server/controllers/productController';
import onError from '@/server/middleware/errors';
import upload from '@/server/lib/multer';
import { authorizeRoles, isAuthenticatedUser } from '@/server/middleware/auth';

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array('image');

handler
  .use(uploadMiddleware, isAuthenticatedUser, authorizeRoles('admin'))
  .post(uploadProductImages);

export default handler;
