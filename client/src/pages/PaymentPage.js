import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateOrderPaymentStatus } from '../redux/order/orderSlice'

const PaymentPage = () => {
  const [loading, setLoading] = useState(false)
  const { upsLoading, updateOrderPaymentStatus: upsResult } = useSelector(
    (state) => state.order
  )
  const navigate = useNavigate()
  const { id: orderId } = useParams()
  const dispatch = useDispatch()
  const orderResult = JSON.parse(localStorage.getItem('orderResult'))
  const razorpayKey = localStorage.getItem('razorpayKey')

  function loadRazorpay() {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onerror = async () => {
      alert('Razorpay SDK failed to load')
    }
    script.onload = () => {
      try {
        setLoading(true)
        const options = {
          key: razorpayKey,
          amount: orderResult.createdOrder.totalPrice * 100,
          currency: 'INR',
          name: 'Example name',
          description: 'Example transaction',

          handler: async function (response) {
            const payload = {
              orderId: orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }

            dispatch(updateOrderPaymentStatus(payload))

            navigate('/')
          },
          prefill: {
            name: 'example name',
            email: 'email@example.com',
            contact: '9400261560',
          },
          notes: {
            address: 'example address',
          },
        }
        setLoading(false)
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
      } catch (error) {
        alert(error)
        setLoading(false)
      }
    }

    document.body.appendChild(script)
  }

  useEffect(() => {
    loadRazorpay()
  }, [])

  return <div></div>
}

export default PaymentPage
