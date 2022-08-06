import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserFromLocalStorage } from './redux/user/userSlice'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import ShippingPage from './pages/ShippingPage'
import PlaceOrder from './pages/PlaceOrder'
import CartPage from './pages/CartPage'
import OrderSummary from './pages/OrderSummary'
import OrderPage from './pages/OrderPage'
import UserListPage from './pages/AdminPages/UserListPage'
import UserPage from './pages/AdminPages/UserPage'
import ProductListPage from './pages/AdminPages/ProductListPage'
import AddProductPage from './pages/AdminPages/AddProductPage'
import CreateProduct from './pages/AdminPages/CreateProduct'
import EditProductPage from './pages/AdminPages/EditProductPage'
import PaymentPage from './pages/PaymentPage'
import ProfilePage from './pages/ProfilePage'
import UserOrders from './pages/UserOrders'
import OrderListPage from './pages/AdminPages/OrderListPage'
import OrderDetailsPage from './pages/AdminPages/OrderDetailsPage'

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
          <Route path='/product/:pid' element={<ProductPage exact />} />
          <Route path='/login' element={<SignInPage />} exact />
          <Route path='/register' element={<RegisterPage />} exact />
          <Route path='/profile/update' element={<UpdateProfilePage />} />

          <Route path='/profile/orders' element={<UserOrders />} />
          <Route path='/profile' element={<ProfilePage />} exact />
          <Route path='/profile/update' element={<UpdateProfilePage />} />
          <Route path='/shipping' element={<ShippingPage />} exact />
          <Route path='/ordersummary' element={<OrderSummary />} exact />
          <Route path='/payment/:id' element={<PaymentPage />} exact />
          <Route path='/placeorder' element={<PlaceOrder />} exact />
          <Route path='/cart' element={<CartPage />} exact />
          <Route path='/order/:id' element={<OrderPage />} exact />
          <Route path='/admin/users' element={<UserListPage />} exact />
          <Route path='/admin/users/:id' element={<UserPage />} exact />
          <Route path='/admin/products' element={<ProductListPage />} exact />
          <Route path='/admin/orders' element={<OrderListPage />} exact />
          <Route
            path='/admin/orders/:id'
            element={<OrderDetailsPage />}
            exact
          />
          <Route
            path='/admin/products/:id'
            element={<AddProductPage />}
            exact
          />
          <Route
            path='/admin/products/create-product'
            element={<CreateProduct />}
            exact
          />
          <Route
            path='/admin/products/edit/:id'
            element={<EditProductPage />}
            exact
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
