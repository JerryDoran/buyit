import UpdateOrder from '@/app/features/admin/UpdateOrder';
import axios from 'axios';
import mongoose from 'mongoose';
import { cookies } from 'next/headers';

async function getOrder(orderId) {
  // this is protected route so I need to pass a token/cookie values to the backend

  const isValidId = mongoose.isValidObjectId(orderId);

  if (!isValidId) {
    return redirect('/');
  }

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
}

export default async function AdminOrderDetailsPage({ params }) {
  const data = await getOrder(params?.orderId);

  return <UpdateOrder order={data?.order} />;
}
