import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import {
  createAddress,
  allAddresses,
} from '@/server/controllers/addressController';
import { isAuthenticatedUser } from '@/server/middleware/auth';
import onError from '@/server/middleware/errors';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(allAddresses);
handler.use(isAuthenticatedUser).post(createAddress);

export default handler;
