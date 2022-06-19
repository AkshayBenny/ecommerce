import React from 'react'

const Product = ({ product }) => {
  return (
    <div className='border rounded-xl hover:shadow-sm transition cursor-pointer'>
      <img
        className='object-cover h-96 w-full rounded-t-xl'
        src={product.image}
        alt={product.name}
      />
      <div className='p-2'>
        <h2 className='truncate text-xl text-gray-700 font-normal uppercase'>
          {product.name}
        </h2>
        <p className='text-2xl text-gray-600 font-semibold'>{product.price}$</p>
      </div>
    </div>
  )
}

export default Product
