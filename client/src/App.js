import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import LoginLogoutPage from './pages/LoginLogoutPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserFromLocalStorage } from './redux/user/userSlice'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getUserInfoFromLocalStorage = () => {
      try {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) return JSON.parse(userInfo)
      } catch (e) {
        console.log(e)
      }
    }

    const userInfo = getUserInfoFromLocalStorage()
    console.log(userInfo)
    const { email, password, name, _id, isAdmin } = userInfo
    if (userInfo) {
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
          <Route path='/login' element={<LoginLogoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
