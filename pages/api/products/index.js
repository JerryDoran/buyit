import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { allProducts } from '@/server/controllers/productController';
import onError from '@/server/middleware/errors';

const handler = nc({ onError });

dbConnect();

handler.get(allProducts);

export default handler;
