import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  getOrderById,
  updateOrderPaymentStatus,
} from '../redux/order/orderSlice'
import { PayPalButton } from 'react-paypal-button-v2'
import { getCart } from '../redux/cart/cartSlice'
const OrderPage = () => {
  const { id } = useParams()
  const { cartItems, total } = useSelector((state) => state.cart)
  const { orderById, oidLoading } = useSelector((state) => state.order)
  const { paymentMode } = useSelector((state) => state.order)
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCart())
    const getClientId = async () => {
      const { data: clientId } = await axios.get(
        'http://localhost:5000/api/config/paypal',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const script = document.createElement('script')
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
      script.type = 'text/javascript'
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    getClientId()
    dispatch(getOrderById({ id }))
  }, [dispatch, id])

  const successPaymentHandler = (paymentResult) => {
    dispatch(updateOrderPaymentStatus({ id, paymentResult }))
  }

  if (oidLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Order Summary</h1>
      <p>Shipping Address: {orderById?.userOrder?.shippingAddress?.address}</p>
      <p>City: {orderById?.userOrder?.shippingAddress?.city}</p>
      <p>Postal Code: {orderById?.userOrder?.shippingAddress?.postalCode}</p>
      <p>Country: {orderById?.userOrder?.shippingAddress?.country}</p>
      <p>Total Price:{total}</p>
      <p>Payment Mode: {paymentMode}</p>
      <p>Paid :{orderById?.userOrder?.isPaid ? 'Paid' : 'Not paid'}</p>
      <p>
        Delivered:
        {orderById?.userOrder?.isDelivered ? 'Deivered' : 'Not delivered'}
      </p>
      <div>
        {cartItems.length > 0 && (
          <>
            {!orderById?.userOrder?.isPaid && (
              <div>
                {oidLoading && <p>Loading...</p>}
                {!sdkReady ? (
                  <p>Loading...</p>
                ) : (
                  <PayPalButton
                    amount={total}
                    currency='USD'
                    onSuccess={successPaymentHandler}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default OrderPage
