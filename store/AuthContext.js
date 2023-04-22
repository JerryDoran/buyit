'use-client';

import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  async function registerUser({ name, email, password }) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (data?.user) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  async function updateUser(formData) {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/update`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data?.user) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  }

  async function addNewAddress(address) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address`,
        address
      );

      if (data) {
        router.push('/me');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  async function updateAddress(id, address) {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`,
        address
      );

      if (data?.address) {
        setUpdated(true);
        router.replace(`/address/${id}`);
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  async function deleteAddress(id) {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/address/${id}`
      );

      if (data?.success) {
        router.push('/me');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        updated,
        loading,
        setUser,
        registerUser,
        clearError,
        addNewAddress,
        setUpdated,
        updateAddress,
        updateUser,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
