import React from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

const ProductPage = () => {
  const { pid } = useParams()
  const product = products.find((product) => product._id === pid)

  if (product) {
    return (
      <div className='grid  lg:grid-cols-3'>
        <div>
          <img
            src={product?.image}
            alt={product?.name}
            className='w-full object-cover'
          />
        </div>
        <div>
          <h1 className=''>{product?.name}</h1>
          <hr />
          <Rating
            rating={product?.rating}
            text={`${product?.numReviews} reviews`}
          />
          <hr />
          <h4>Price: {product.price}$</h4>
          <p>{product?.description}</p>
        </div>
        <div>
          <button
            disabled={product.countInStock === 0}
            className='bg-black text-white px-4 py-2 hover:text-gray-300 transition disabled:bg-gray-700 disabled:cursor-not-allowed'
          >
            Add to cart
          </button>
        </div>
      </div>
    )
  } else {
    return <div>Product not found</div>
  }
}

export default ProductPage
