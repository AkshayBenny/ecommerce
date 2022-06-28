import { useState } from 'react'
import { useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { setPaymentMode, setShippingDetails } from '../redux/order/orderSlice'

const ShippingPage = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setShippingDetails({ address, city, postalCode, country }))
    dispatch(setPaymentMode(paymentMethod))
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
    localStorage.setItem(
      'shippingDetails',
      JSON.stringify({ address, city, postalCode, country })
    )
  }

  // console.log(JSON.parse(localStorage.getItem('shippingDetails')));

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
        <input
          type='radio'
          label='Stripe'
          id='Stripe'
          name='paymentMethod'
          value='Stripe'
          checked={paymentMethod === 'Stripe'}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Stripe
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default ShippingPage
