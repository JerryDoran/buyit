'use client';

import { Blocks } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Blocks
        visible={true}
        height='80'
        width='80'
        ariaLabel='blocks-loading'
        wrapperStyle={{}}
        wrapperClass='blocks-wrapper'
      />
    </div>
  );
}
