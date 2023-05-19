'use client';

import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  function setCartToState() {
    setCart(
      localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []
    );
  }

  function addItemToCart({
    productId,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) {
    const item = {
      productId,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    };

    const existingCartItem = cart?.cartItems?.find(
      (cartItem) => cartItem.productId === item.productId
    );

    let newCartItems;

    if (existingCartItem) {
      newCartItems = cart?.cartItems?.map((cartItem) =>
        cartItem.productId === existingCartItem.productId ? item : cartItem
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }));

    setCartToState();
  }

  function deleteItemFromCart(id) {
    const newCartItems = cart?.cartItems?.filter(
      (item) => item.productId !== id
    );

    localStorage.setItem('cart', JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  }

  function saveOnCheckout(data) {
    const { amount, tax, totalAmount } = data;

    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartToState();

    router.push('/shipping');
  }

  function clearCart() {
    localStorage.removeItem('cart');
    setCartToState();
  }

  useEffect(() => {
    setCartToState();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        saveOnCheckout,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
