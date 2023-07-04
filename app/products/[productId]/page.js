import ProductDetails from '@/app/features/products/ProductDetails';
import axios from 'axios';
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';

async function getProductDetails(productId) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
  );

  return data?.product;
}

export default async function ProductDetailsPage({ params }) {
  const isValidId = mongoose.isValidObjectId(params?.productId);

  if (!isValidId) {
    return redirect('/');
  }

  const product = await getProductDetails(params.productId);

  return <ProductDetails product={product} />;
}
