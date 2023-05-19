'use client';

import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(null);
  const router = useRouter();

  async function newProduct(product) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
        product
      );

      if (data) {
        router.replace('/admin/products');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
