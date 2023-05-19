'use client';

import { useContext, useEffect } from 'react';
import CustomPagination from '../layout/CustomPagination';
import OrderItem from './OrderItem';
import { CartContext } from '@/store/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ListOrders({ orders }) {
  const { clearCart } = useContext(CartContext);

  const params = useSearchParams();
  const router = useRouter();
  const orderSuccess = params.get('order_success');

  useEffect(() => {
    if (orderSuccess === 'true') {
      clearCart();
      router.replace('/me/orders');
    }
  }, []);

  return (
    <>
      <h3 className='text-xl font-semibold mb-5'>Your Orders</h3>
      {orders?.orders?.map((order) => (
        <OrderItem key={order._id} order={order} />
      ))}
      <CustomPagination
        resultsPerPage={orders?.resPerPage}
        productsCount={orders?.ordersCount}
      />
    </>
  );
}
