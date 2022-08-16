import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { getCart } from '../redux/cart/cartSlice'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'

const CartPage = () => {
  const { cartItems, total, isLoading } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart</div>
  }

  if (cartItems && cartItems.length > 0) {
    return (
      <div className='grid lg:grid-cols-2 px-4 pt-6'>
        <Meta title={'Cart'} />
        <div className='space-y-4 w-full'>
          <h1 className='text-3xl font-light pb-6'>Cart</h1>
          {cartItems?.map((product, index) => {
            return (
              <CartProduct
                key={index}
                product={product.product}
                index={index}
              />
            )
          })}
        </div>
        <div className='mt-12  flex flex-col lg:justify-between lg:mt-0 lg:border-2 border-black lg:p-6 space-y-4 max-w-[500px] w-full ml-auto'>
          <div className='space-y-4'>
            <div className='font-medium text-black opacity-40 flex justify-between items-center'>
              <p className=''>Subtotal</p>
              <p>{total}₹</p>
            </div>
            <div className='flex justify-between items-center text-black font-light opacity-30'>
              <p>Delivery</p>
              <p>0</p>
            </div>
            <div className='flex justify-between border-b border-black border-opacity-10 pb-12 items-center text-black font-light opacity-30'>
              <p>Tax</p>
              <p>0</p>
            </div>
            <div className='flex justify-between items-center pt-6 text-black font-semibold '>
              <h3>Total</h3>
              <p>{total}₹</p>
            </div>
          </div>
          <div className='flex flex-col gap-4 '>
            <Link to='/shipping'>
              <button className='p-3 w-full border-black border-2  bg-black text-white cursor-pointer'>
                Proceed to checkout
              </button>
            </Link>
            <Link to='/'>
              <button className='p-3 bg-white w-full border-2 border-black text-black cursor-pointer'>
                Continue shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default CartPage
