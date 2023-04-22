import Profile from '@/app/features/auth/Profile';
import axios from 'axios';
import { cookies } from 'next/headers';

async function getAddresses() {
  // this is protected route so I need to pass a token/cookie values to the backend

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data?.addresses;
}

export default async function MePage() {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
}
