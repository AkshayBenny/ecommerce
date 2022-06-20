import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import axios from 'axios'

const HomePage = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products')
        setProducts(data)
      } catch (error) {
        throw new Error(error.message)
      }
    }
    fetchAllProducts()
  }, [])

  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
      {products?.map((product, index) => {
        return (
          <Link to={`/product/${product._id}`} key={index}>
            <Product product={product} />
          </Link>
        )
      })}
    </div>
  )
}

export default HomePage
