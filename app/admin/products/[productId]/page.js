import axios from 'axios';
import UpdateProduct from '@/app/features/admin/UpdateProduct';

async function getProduct(productId) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`
  );
  return data;
}

export default async function UpdateProductPage({ params }) {
  const productData = await getProduct(params.productId);

  return (
    <main>
      <UpdateProduct data={productData?.product} />
    </main>
  );
}
