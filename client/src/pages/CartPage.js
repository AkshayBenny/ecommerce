import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { getCart } from '../redux/cart/cartSlice'
import { Link } from 'react-router-dom'

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
      <div className='grid grid-cols-2'>
        <div>
          {cartItems?.map((product, index) => {
            return <CartProduct key={index} product={product.product} />
          })}
          <Link to='/shipping'>
            <button className='px-4 py-2 bg-black text-white cursor-pointer'>
              Proceed to checkout
            </button>
          </Link>
        </div>
        <div>
          <h3>Cart Totals:{total}</h3>
        </div>
      </div>
    )
  }
}

export default CartPage
