import Product from '../components/Product'
import products from '../products'

const HomePage = () => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
      {products.map((product, index) => {
        return <Product product={product} index={index} />
      })}
    </div>
  )
}

export default HomePage
