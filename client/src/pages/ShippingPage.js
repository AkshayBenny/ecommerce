import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(setPaymentMode(paymentMethod))
    dispatch(setUserAddress(address))
    dispatch(setUserCity(city))
    dispatch(setUserPostalCode(postalCode))
    dispatch(setUserCountry(country))
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
    localStorage.setItem(
      'shippingDetails',
      JSON.stringify({ address, city, postalCode, country })
    )
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
          label='PayPal'
          id='PayPal'
          name='paymentMethod'
          value='PayPal'
          checked={paymentMethod === 'PayPal'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        PayPal
      </div>

      <Link to='/ordersummary'>
        <button>Submit</button>
      </Link>
    </form>
  )
}

export default ShippingPage
