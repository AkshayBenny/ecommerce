import React from 'react'

const CartProduct = ({ product }) => {
  return (
    <div className='flex items-center'>
      <img src={product.image} alt={product.name} className='h-24' />
      <div>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </div>
  )
}

export default CartProduct
