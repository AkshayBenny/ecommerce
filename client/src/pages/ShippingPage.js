import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Footer from '../components/Footer'
import Header from '../components/Header'
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
    <>
      <Header />

      <form
        onSubmit={submitHandler}
        className='lg:space-y-12 max-w-[1200px] mx-auto'
      >
        <h1 className='text-3xl font-light mt-14 '>Shipping details</h1>
        <div>
          <p className='font-light pb-2'>Enter address</p>
          <input
            type='text'
            placeholder='Enter address'
            onChange={(e) => setAddress(e.target.value)}
            className='w-full border-2  border-black rounded-none px-4 py-4'
          />
        </div>
        <div>
          <p className='font-light pb-2'>Enter city</p>
          <input
            type='text'
            placeholder='Enter city'
            onChange={(e) => setCity(e.target.value)}
            className='w-full border-2  border-black rounded-none px-4 py-4'
          />
        </div>

        <div>
          <p className='font-light pb-2'>Enter postal code</p>
          <input
            type='text'
            placeholder='Enter postal code'
            onChange={(e) => setPostalCode(e.target.value)}
            className='w-full border-2  border-black rounded-none px-4 py-4'
          />
        </div>
        <div>
          <p className='font-light pb-2'>Enter country</p>
          <input
            type='text'
            placeholder='Enter country'
            onChange={(e) => setCountry(e.target.value)}
            className='w-full border-2  border-black rounded-none px-4 py-4'
          />
        </div>
        <div>
          {/* payment methods */}
          <p className='font-light pb-2'>Payment gateway</p>
          <div className='flex gap-4 items-center '>
            <input
              type='radio'
              label='Razorpay'
              id='Razorpay'
              name='paymentMethod'
              value='Razorpay'
              checked={paymentMethod === 'Razorpay'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <p className='font-light '>Razorpay</p>
          </div>
        </div>

        <div className='w-full flex justify-end'>
          <button
            type='submit'
            className=' relative px-8 py-4 font-medium group ml-auto'
          >
            <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
            <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
            <span className='relative text-black group-hover:text-white'>
              Submit
            </span>
          </button>
        </div>
      </form>
      <Footer />
    </>
  )
}

export default ShippingPage
