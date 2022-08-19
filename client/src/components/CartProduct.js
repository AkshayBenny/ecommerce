import React, { useState } from 'react'

const CartProduct = ({ product, userCartItem, index }) => {
  const [quantity, setQuantity] = useState(userCartItem.quantity)
  console.log(userCartItem)
  return (
    <div className='flex flex-col lg:flex-row w-full my-6 lg:my-0'>
      <div className='lg:flex  jusity-between gap-4  w-full'>
        <div className={`${index % 2 === 0 ? 'bg-myPurple' : 'bg-myPink'} p-4`}>
          <img
            src={product.image}
            alt={product.name}
            className={`${
              index % 2 === 0 ? 'bg-myPurple' : 'bg-myPink'
            } w-[220px] h-[220px] `}
          />
        </div>
        <div className='flex-col justify-between flex'>
          <h3 className='pt-4 lg:pt-0 pb-2 lg:pb-0 truncate text-2xl font-light max-w-[400px]'>
            {product.name}
          </h3>
          <div className='h-full flex-col  justify-between lg:hidden pb-4 flex'>
            <p className='font-medium text-3xl'>{product.price}₹</p>
          </div>
          <div className='flex pb-4 lg:pb-0 lg:py-6 items-center gap-4 '>
            <button
              className='text-2xl'
              onClick={() => {
                quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)
              }}
            >
              -
            </button>
            <input
              type='text'
              value={quantity}
              className='w-[34px] h-[34px]  border px-2'
            />
            <button
              className='text-2xl'
              onClick={() => {
                quantity < product.countInStock
                  ? setQuantity(quantity + 1)
                  : setQuantity(quantity)
              }}
            >
              +
            </button>
          </div>

          <div className=' flex gap-2'>
            <button className='bg-myPurple text-white p-3'>
              Save for later
            </button>
            <button className='bg-myPink text-white p-3'>Delete</button>
          </div>
        </div>
      </div>
      <div className='h-full flex-col  justify-between hidden lg:flex'>
        <p className='font-medium text-3xl'>{product.price}₹</p>
      </div>
    </div>
  )
}

export default CartProduct
