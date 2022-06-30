import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { getCart } from '../redux/cart/cartSlice'

const CartPage = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])
  console.log(cartItems.userProducts)
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!cartItems) {
    return <div>No items in cart</div>
  }

  return (
    <div>
      {cartItems.userProducts.map((product, index) => {
        return <CartProduct key={index} product={product} />
      })}
    </div>
  )
}

export default CartPage
