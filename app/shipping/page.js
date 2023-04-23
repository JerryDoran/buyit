import { cookies } from 'next/headers';
import Shipping from '../features/cart/Shipping';
import axios from 'axios';

async function getAddresses() {
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

export default async function ShippingPage() {
  const addresses = await getAddresses();
  return (
    <div>
      <Shipping addresses={addresses} />
    </div>
  );
}
