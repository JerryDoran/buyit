import axios from 'axios';
import ListProducts from './features/products/ListProducts';
import queryString from 'query-string';

async function getProducts(searchParams) {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    'price[gte]': searchParams.min,
    'price[lte]': searchParams.max,
    'ratings[gte]': searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${searchQuery}`
  );
  return data;
}

export default async function Home({ searchParams }) {
  const productsData = await getProducts(searchParams);
  return (
    <main>
      <ListProducts data={productsData} />
    </main>
  );
}
