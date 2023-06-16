'use client';

/* eslint-disable react-hooks/exhaustive-deps */

import { AuthContext } from '@/store/AuthContext';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, registerUser, clearError } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    registerUser({ name, email, password });
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      clearError();
    }
  }, [error]);

  return (
    <div
      style={{ maxWidth: '480px' }}
      className='mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg'
    >
      <form onSubmit={handleSubmit}>
        <h2 className='mb-5 text-2xl font-semibold'>Register Account</h2>

        <div className='mb-4'>
          <label className='block mb-1'> Full Name </label>
          <input
            className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
            type='text'
            placeholder='Type your name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-1'> Email </label>
          <input
            className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
            type='text'
            placeholder='Type your email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-1'> Password </label>
          <input
            className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
            type='password'
            placeholder='Type your password'
            minLength={6}
            required
            A
          />
        </div>

        <button
          type='submit'
          className='my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
        >
          Register
        </button>

        <hr className='mt-4' />

        <p className='text-center mt-5'>
          Already have an account?
          <Link href='/login' className='text-blue-500 hover:underline'>
            {' '}
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
