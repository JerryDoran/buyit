import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import {
  updateAddress,
  singleAddress,
  deleteAddress,
} from '@/server/controllers/addressController';
import { isAuthenticatedUser } from '@/server/middleware/auth';
import onError from '@/server/middleware/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(singleAddress);
handler.use(isAuthenticatedUser).put(updateAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);

export default handler;
