import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import LoginLogoutPage from './pages/RegisterPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserFromLocalStorage } from './redux/user/userSlice'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import ShippingPage from './pages/ShippingPage'
import PlaceOrder from './pages/PlaceOrder'
import CartPage from './pages/CartPage'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUserInfoFromLocalStorage = () => {
      const userInfo = localStorage.getItem('userInfo')

      if (userInfo) return JSON.parse(userInfo)
    }

    const userInfo = getUserInfoFromLocalStorage()

    if (userInfo) {
      const { email, password, name, _id, isAdmin } = userInfo
      dispatch(setUserFromLocalStorage({ email, password, name, _id, isAdmin })) //to get user info from local storage
    }
  }, [dispatch])

  return (
    <div className='App'>
      <Header />
      <main className='py-8 md:px-24 p-4'>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/product/:pid' element={<ProductPage />} />
          <Route path='/login' element={<SignInPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile/update' element={<UpdateProfilePage />} />
          <Route path='/shipping' element={<ShippingPage />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
