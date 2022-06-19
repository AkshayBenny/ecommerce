import React from 'react'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <div className='border rounded-xl hover:shadow-sm transition cursor-pointer'>
      <img
        className='object-cover h-96 w-full p-2 rounded-xl'
        src={product.image}
        alt={product.name}
      />
      <div className='p-2 space-y-2'>
        <h2 className='truncate text-xl text-gray-700 font-normal uppercase'>
          {product.name}
        </h2>
        <Rating
          rating={product.rating}
          text={`${product.numReviews} reviews`}
        />
        <p className='text-2xl text-gray-600 font-light'>{product.price}$</p>
      </div>
    </div>
  )
}

export default Product
