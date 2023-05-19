'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from 'react-js-pagination';

export default function CustomPagination({ resultsPerPage, productsCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get('page') || 1;
  page = +page;

  let queryParams;

  function handlePageChange(currentPage) {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has('page')) {
        queryParams.set('page', currentPage);
      } else {
        queryParams.append('page', currentPage);
      }

      const path = window.location.pathname + '?' + queryParams.toString();

      router.push(path);
    }
  }

  return (
    <div className='flex mt-20 justify-center'>
      <Pagination
        activePage={page}
        itemsCountPerPage={resultsPerPage}
        totalItemsCount={productsCount}
        prevPageText={'Prev'}
        nextPageText={'Next'}
        firstPageText={'First'}
        lastPageText={'Last'}
        itemClass='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
        activeLinkClassName='z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20'
        activeClass='z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 text-sm font-medium text-indigo-600 focus:z-20'
        onChange={handlePageChange}
      />
    </div>
  );
}
