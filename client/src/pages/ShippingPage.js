import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import {
  setPaymentMode,
  setUserAddress,
  setUserCity,
  setUserPostalCode,
  setUserCountry,
} from '../redux/order/orderSlice'

const ShippingPage = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('RazorPay')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(setPaymentMode(paymentMethod))
    dispatch(setUserAddress(address))
    dispatch(setUserCity(city))
    dispatch(setUserPostalCode(postalCode))
    dispatch(setUserCountry(country))

    localStorage.setItem(
      'shippingDetails',
      JSON.stringify({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    )
    navigate('/ordersummary')
  }

  return (
    <form onSubmit={submitHandler}>
      <CheckoutSteps />
      <input
        type='text'
        placeholder='Enter address'
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter city'
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter postal code'
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter country'
        onChange={(e) => setCountry(e.target.value)}
      />
      <div>
        {/* payment methods */}
        <input
          type='radio'
          label='Razorpay'
          id='Razorpay'
          name='paymentMethod'
          value='Razorpay'
          checked={paymentMethod === 'Razorpay'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Razorpay
      </div>

      <button>Submit</button>
     
    </form>
  )
}

export default ShippingPage
