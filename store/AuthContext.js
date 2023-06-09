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

  async function loadUser() {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/auth/session?update');

      if (data?.user) {
        setUser(data.user);
        router.replace('/me');
      }
    } catch (error) {
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
        loadUser();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
    }
  }

  async function updatePassword({ currentPassword, newPassword }) {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/update_password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (data?.success) {
        router.replace('/me');
      }
    } catch (error) {
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

  async function updateAdminUser(userId, userData) {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
        userData
      );

      if (data?.success) {
        setUpdated(true);
        router.replace('/admin/users/');
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  }

  async function deleteAdminUser(userId) {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`
      );

      if (data?.success) {
        setUpdated(true);
        router.replace('/admin/users');
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
        updatePassword,
        deleteAddress,
        updateAdminUser,
        deleteAdminUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
