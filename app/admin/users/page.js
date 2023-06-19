import Users from '@/app/features/admin/Users';
import axios from 'axios';
import { cookies } from 'next/headers';
import queryString from 'query-string';

async function getUsers(searchParams) {
  // this is protected route so I need to pass a token/cookie values to the backend

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const urlParams = {
    page: searchParams?.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
}

export default async function AdminUsersPage({ searchParams }) {
  const users = await getUsers(searchParams);

  return <Users data={users} />;
}
