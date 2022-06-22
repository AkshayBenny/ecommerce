import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
function App() {
 
  return (
    <div className='App'>
      <Header />
      <main className='py-8 md:px-24 p-4'>
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/product/:pid' element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
