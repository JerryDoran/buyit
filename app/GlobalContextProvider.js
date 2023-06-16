'use client';

import AuthContextProvider from '@/store/AuthContext';
import CartContextProvider from '@/store/CartContext';
import ProductContextProvider from '@/store/ProductContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import OrderContextProvider from '@/store/OrderContext';

export default function GlobalContextProvider({ children }) {
  return (
    <>
      <ToastContainer autoClose={3000} position='bottom-right' />
      <AuthContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <OrderContextProvider>
              <SessionProvider>{children}</SessionProvider>
            </OrderContextProvider>
          </ProductContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}
