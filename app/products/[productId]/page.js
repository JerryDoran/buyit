import ProductDetails from '@/app/features/products/ProductDetails';
import axios from 'axios';

async function getProductDetails(productId) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
  );
  
  return data?.product;
}

export default async function ProductDetailsPage({ params }) {
  const product = await getProductDetails(params.productId);

  return <ProductDetails product={product} />;
}
