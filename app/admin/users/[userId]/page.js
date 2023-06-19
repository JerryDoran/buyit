import UpdateUser from '@/app/features/admin/UpdateUser';
import axios from 'axios';
import { cookies } from 'next/headers';

async function getUser(userId) {
  // this is protected route so I need to pass a token/cookie values to the backend

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
}

export default async function AdminUserDetailsPage({ params }) {
  const data = await getUser(params?.userId);

  return <UpdateUser user={data?.user} />;
}
