import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/cart/cartSlice'
import { createOrder } from '../redux/order/orderSlice'

const OrderSummary = () => {
  const dispatch = useDispatch()
  const { paymentMode, error, isLoading } = useSelector((state) => state.order)
  const { cartItems } = useSelector((state) => state.cart)
  const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'))
  console.log(cartItems)

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])

  //orderItems
  const orderItems = []
  cartItems?.userProducts?.forEach((product) => {
    // console.log(product)
    orderItems.push({
      name: product.name,
      qty: product.qty,
      image: product.image,
      price: product.price,
      product: product._id,
    })
  })
  
  //shippingAddress
  const shippingAddress = {
    address: shippingDetails.address,
    city: shippingDetails.city,
    postalCode: shippingDetails.postalCode,
    country: shippingDetails.country,
  }
  //paymentMethod
  const paymentMethod = paymentMode

  const clickHandler = () => {
    dispatch(createOrder({ orderItems, shippingAddress, paymentMethod }))
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Shipping Address: {shippingDetails.address}</p>
      <p>City: {shippingDetails.city}</p>
      <p>Postal Code: {shippingDetails.postalCode}</p>
      <p>Country: {shippingDetails.country}</p>
      <p>Payment Mode: {paymentMode}</p>
      <button className onClick={clickHandler}>
        Place order
      </button>
    </div>
  )
}

export default OrderSummary
