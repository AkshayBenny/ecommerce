import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/product/productSlice'
import ReactLoading from 'react-loading'
import { addToCart } from '../redux/cart/cartSlice'
import { addReview } from '../redux/product/productsSlice'
import Meta from '../components/Meta'

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const [userReview, setUserReview] = useState({
    rating: 1,
    comment: '',
  })
  const { pid } = useParams()
  const { product, isLoading, error, addReviewResIsLoading, addReviewRes } =
    useSelector((state) => state.product)
  const dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const addToCartHandler = () => {
    const cartItems = {
      product: pid,
      quantity: quantity,
      price: product.price * quantity,
    }
    dispatch(addToCart({ cartItems }))
  }
  useEffect(() => {
    dispatch(getProduct(pid))
  }, [pid, dispatch])
  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    let id = pid
    let rating = userReview.rating
    let comment = userReview.comment
    dispatch(addReview({ id, comment, rating }))
    dispatch(getProduct(pid))
    setUserReview({
      rating: 0,
      comment: '',
    })
  }

  if (error) {
    return <div>Something went wrong...</div>
  }

  if (isLoading) {
    return (
      <div className='h-screen w-screen max-h-screen max-w-screen flex items-center'>
        <ReactLoading type={'bubbles'} color={'#6b7280'} className='mx-auto' />
      </div>
    )
  }

  if (product) {
    return (
      <div>
        <Meta title={product?.name} />
        <div className='grid  lg:grid-cols-3'>
          <div>
            <img
              src={product?.image}
              alt={product?.name}
              className='w-full object-cover'
            />
          </div>
          <div>
            <h1 className='text-xl font-semibold'>{product?.name}</h1>
            <hr />
            <Rating rating={4} numReviews={product?.numReviews} />
            <hr />
            <h4>Price: {product.price}$</h4>
            <p>{product?.description}</p>
          </div>
          <div>
            <button
              onClick={() => {
                quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity)
              }}
            >
              -
            </button>
            <p>{quantity}</p>
            <button
              onClick={() => {
                quantity < product.countInStock
                  ? setQuantity(quantity + 1)
                  : setQuantity(quantity)
              }}
            >
              +
            </button>
          </div>
          <div>
            <button
              disabled={product.countInStock === 0}
              className='bg-black text-white px-4 py-2 hover:text-gray-300 transition disabled:bg-gray-700 disabled:cursor-not-allowed'
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
        <div className='w-full'>
          <div>
            <h1 className='text-xl font-light mt-24'>Reviews</h1>
            {userInfo ? (
              <form onSubmit={reviewSubmitHandler} className='mt-12'>
                <select
                  onChange={(e) =>
                    setUserReview((prev) => ({
                      ...prev,
                      rating: parseInt(e.target.value),
                    }))
                  }
                >
                  <option value='1'>1</option>
                  <option value='1'>2</option>
                  <option value='1'>3</option>
                  <option value='1'>4</option>
                  <option value='1'>5</option>
                </select>
                <textarea
                  placeholder='Post your review'
                  className='w-full border italic p-4'
                  onChange={(e) =>
                    setUserReview((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                ></textarea>
                <button className='bg-black p-2 text-white mt-2 '>Post</button>
              </form>
            ) : (
              <p className='italic opacity-50'>Login in add a review</p>
            )}
          </div>

          <div className='mt-12'>
            {product.reviews &&
              product.reviews.map((review, index) => {
                console.log(review)
                return (
                  <div className=' border-y space-y-3' key={index}>
                    <div className='flex items-center gap-4'>
                      <div>
                        <h4 className='font-bold'>{review.name}</h4>
                        <p className='opacity-[40%] italic font-medium'>
                          {review.createdAt.substring(0, 10)}
                        </p>
                      </div>
                      <Rating rating={review.rating} />
                    </div>
                    <p className='opacity-[70%] italic'>{review.comment}</p>
                  </div>
                )
              })}
            {product?.reviews?.length === 0 && (
              <p className='italic opacity-50'>No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return <div>Product not found</div>
  }
}

export default ProductPage
