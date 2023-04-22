'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseCallbackUrl } from '@/utils/helpers';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = await signIn('credentials', {
      email,
      password,
      callbackUrl: callbackUrl ? parseCallbackUrl(callbackUrl) : '/',
    });

    console.log('data from login', data);

    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push('/');
    }
  }

  return (
    <div
      style={{ maxWidth: '480px' }}
      className='mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg'
    >
      <form onSubmit={handleSubmit}>
        <h2 className='mb-5 text-2xl font-semibold'>Login</h2>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type='submit'
          className='my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
        >
          Login
        </button>

        <hr className='mt-4' />

        <p className='text-center mt-5'>
          Don't have an account?{' '}
          <Link href='/register' className='text-blue-500'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
