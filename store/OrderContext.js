'use client';

import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';
import axios from 'axios';

export const OrderContext = createContext();

export default function OrderContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [canReview, setCanReview] = useState(false);

  const router = useRouter();

  async function updateOrder(orderId, orderData) {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}`,
        orderData
      );

      if (data?.success) {
        setUpdated(true);
        router.replace('/admin/orders/');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  async function deleteOrder(orderId) {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}`
      );

      if (data?.success) {
        router.replace('/admin/orders/');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  async function canUserReview(productId) {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders/can_review?productId=${productId}`
      );

      if (data?.canReview) {
        setCanReview(data?.canReview);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  function clearErrors() {
    setError(null);
  }

  return (
    <OrderContext.Provider
      value={{
        error,
        updated,
        canReview,
        canUserReview,
        setUpdated,
        updateOrder,
        clearErrors,
        deleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
