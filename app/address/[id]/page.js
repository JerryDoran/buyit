import UpdateAddress from '@/app/features/user/UpdateAddress';
import axios from 'axios';
import { cookies } from 'next/headers';

async function getAddress(id) {
  // this is protected route so I need to pass a token/cookie values to the backend

  const nextCookies = cookies();
  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data?.address;
}

export default async function UpdateAddressPage({ params }) {
  const address = await getAddress(params?.id);

  return <UpdateAddress id={params?.id} address={address} />;
}
