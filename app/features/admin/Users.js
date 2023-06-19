'use client';

import Link from 'next/link';
import CustomPagination from '../layout/CustomPagination';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/store/AuthContext';

export default function Users({ data }) {
  const { error, deleteAdminUser, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <h1 className='text-3xl my-5 ml-4 font-bold'>{data?.usersCount} Users</h1>
      <table className='w-full text-sm text-left'>
        <thead className='text-l text-gray-700 uppercase'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3'>
              Role
            </th>
            <th scope='col' className='px-6 py-3'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((user) => (
            <tr key={user._id} className='bg-white'>
              <td className='px-6 py-2'>{user.name}</td>
              <td className='px-6 py-2'>{user.email}</td>
              <td className='px-6 py-2'>{user.role}</td>
              <td className='px-6 py-2'>
                <div>
                  <Link
                    href={`/admin/users/${user._id}`}
                    className='px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2'
                  >
                    <i className='fa fa-pencil' aria-hidden='true'></i>
                  </Link>
                  <a
                    className='px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer'
                    onClick={() => deleteAdminUser(user?._id)}
                  >
                    <i className='fa fa-trash' aria-hidden='true'></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.usersCount > data?.resPerPage && (
        <div className='mb-6'>
          <CustomPagination
            resultsPerPage={data?.users?.resPerPage}
            usersCount={data?.users?.usersCount}
          />
        </div>
      )}
    </div>
  );
}
