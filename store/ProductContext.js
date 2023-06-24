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
      console.log(error.response);
      setError(error?.response?.data?.message);
    }
  }

  async function updateProductData(product, productId) {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productId}`,
        product
      );

      if (data) {
        setUpdated(true);
        router.replace('/admin/products/');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  async function deleteProduct(productId) {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productId}`
      );

      if (data?.success) {
        router.replace('/admin/products/');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  async function postReview(reviewData) {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/review`,
        reviewData
      );

      if (data?.success) {
        router.refresh(`/products/${reviewData?.productId}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  }

  async function uploadProductImages(formData, productId) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/upload_images/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data?.data) {
        setLoading(false);
        router.replace('/admin/products');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  function clearErrors() {
    setError(null);
  }

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        updateProductData,
        uploadProductImages,
        postReview,
        clearErrors,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
