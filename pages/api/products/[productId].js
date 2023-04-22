import nc from 'next-connect';
import dbConnect from '@/server/config/dbConnect';
import { singleProduct } from '@/server/controllers/productController';

const handler = nc();

dbConnect();

handler.get(singleProduct);

export default handler;
