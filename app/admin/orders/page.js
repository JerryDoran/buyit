import Orders from '@/app/features/admin/Orders';
import axios from 'axios';
import { cookies } from 'next/headers';
import queryString from 'query-string';

async function getOrders(searchParams) {
  // this is protected route so I need to pass a token/cookie values to the backend

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const urlParams = {
    page: searchParams?.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
}

export default async function AdminOrdersPage({ searchParams }) {
  const orders = await getOrders(searchParams);

  return <Orders orders={orders} />;
}
