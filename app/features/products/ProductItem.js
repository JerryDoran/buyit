'use client';

import Image from 'next/image';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import { CartContext } from '@/store/CartContext';
import { useContext } from 'react';

export default function ProductItem({ product }) {
  const { addItemToCart } = useContext(CartContext);

  function handleAddToCart() {
    addItemToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      seller: product.seller,
    });
  }
  return (
    <article className='border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5'>
      <div className='flex flex-col md:flex-row'>
        <Link href={`/products/${product._id}`} className='hover:text-blue-600'>
          <div className='md:w-1/4 flex p-3'>
            <div
              style={{
                width: '80%',
                height: '70%',
                position: 'relative',
              }}
            >
              <Image
                src={
                  product?.images[0]
                    ? product?.images[0].url
                    : '/images/default_product.png'
                }
                alt='product name'
                height='240'
                width='240'
              />
            </div>
          </div>
          <div className='md:w-2/4'>
            <div className='p-4'>
              {product.name}

              <div className='flex flex-wrap items-center space-x-2 mb-2'>
                <div className='ratings'>
                  <div className='my-1'>
                    <StarRatings
                      rating={product?.ratings}
                      starRatedColor='#ffb829'
                      numberOfStars={5}
                      starDimension='18px'
                      starSpacing='1px'
                      name='rating'
                    />
                  </div>
                </div>
                <b className='text-gray-300'>•</b>
                <span className='ml-1 text-yellow-500'>{product?.ratings}</span>
              </div>
              <p className='text-gray-500 mb-2'>
                {product.description.substring(0, 150)}...
              </p>
            </div>
          </div>
        </Link>
        <div className='w-2/4 border-t lg:border-t-0 lg:border-l border-gray-200'>
          <div className='p-5'>
            <span className='text-xl font-semibold text-black'>
              ${product.price}
            </span>

            <p className='text-green-500'>Free Shipping</p>
            <div className='my-3'>
              <a
                className='text-sm px-6 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer'
                onClick={handleAddToCart}
              >
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
