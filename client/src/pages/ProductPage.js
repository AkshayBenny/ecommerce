import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/product/productSlice'
import ReactLoading from 'react-loading'
import { addToCart, getCart } from '../redux/cart/cartSlice'
import { addReview } from '../redux/product/productsSlice'
import Meta from '../components/Meta'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const [userReview, setUserReview] = useState({
    rating: 1,
    comment: '',
  })
  const { pid } = useParams()
  const { product, isLoading, error } = useSelector((state) => state.product)
  const { addReviewResIsLoading } = useSelector((state) => state.products)
  const { addToCartResIsLoading } = useSelector((state) => state.cart)
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
    dispatch(getCart())
  }, [addToCartResIsLoading])

  useEffect(() => {
    dispatch(getProduct(pid))
  }, [pid, dispatch, addReviewResIsLoading])
  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    let id = pid
    let rating = userReview.rating
    let comment = userReview.comment
    dispatch(addReview({ id, comment, rating }))

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
      <>
        <Header />
        <div className='max-w-screen'>
          <Meta title={product?.name} />
          <div className='grid lg:pr-4  lg:grid-cols-2 gap-12'>
            <div className='bg-myPurple flex items-center justify-center'>
              <img
                src={product?.image}
                alt={product?.name}
                className='max-h-[600px] object-cover bg-myPurple aspect-square'
              />
            </div>
            <div className='px-4 lg:px-0 flex flex-col justify-between'>
              <div>
                <h1 className='text-3xl font-medium pb-6'>{product?.name}</h1>
                <hr />
                <div className='py-6 space-y-6'>
                  <h4 className='font-extralight text-4xl'>
                    ₹{product.price} INR
                  </h4>
                  <Rating rating={4} numReviews={product?.numReviews} />
                </div>
                <hr />
                <h1 className='text-xl font-semibold pt-6 pb-3'>Description</h1>
                <p>{product?.description}</p>
              </div>
              <div>
                <h2 className='text-xl font-semibold pt-6 '>Set quantity</h2>
                <div className='flex pt-6 items-center gap-4'>
                  <button
                    className='text-2xl'
                    onClick={() => {
                      quantity > 1
                        ? setQuantity(quantity - 1)
                        : setQuantity(quantity)
                    }}
                  >
                    -
                  </button>
                  <input
                    type='text'
                    value={quantity}
                    className='w-[34px] h-[34px]  rounded-full border px-3'
                  />
                  <button
                    className='text-2xl'
                    onClick={() => {
                      quantity < product.countInStock
                        ? setQuantity(quantity + 1)
                        : setQuantity(quantity)
                    }}
                  >
                    +
                  </button>
                </div>

                {/* <button
                disabled={product.countInStock === 0}
                className='bg-black text-white mt-6  px-4 py-4 text-xl  hover:text-gray-300 transition w-full  disabled:bg-gray-700 disabled:cursor-not-allowed'
                onClick={addToCartHandler}
              >
                Add to cart
              </button> */}
                <button
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  className='mt-12 relative w-full px-4 py-3 font-medium group'
                >
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                  <span className='relative text-black group-hover:text-white'>
                    Add to cart
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className='w-full max-w-[1200px] px-4 mx-auto'>
            <div>
              <h1 className='text-xl font-semibold pt-12 pb-3'>Reviews</h1>

              {userInfo ? (
                <form
                  onSubmit={reviewSubmitHandler}
                  className='mt-12  relative z-0'
                >
                  <select
                    className='absolute bottom-5 border bg-black text-white  right-[200px] px-4 py-2  z-40'
                    onChange={(e) =>
                      setUserReview((prev) => ({
                        ...prev,
                        rating: parseInt(e.target.value),
                      }))
                    }
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <textarea
                    placeholder='Post your review'
                    className='w-full min-h-[200px]  border italic p-4 bg-slate-100'
                    onChange={(e) =>
                      setUserReview((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                  ></textarea>

                  <div className='absolute right-4 bottom-4 z-50 mt-2'>
                    <button className='mt-12 relative w-full px-5 py-3 font-medium group'>
                      <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                      <span className='absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black'></span>
                      <span className='relative text-black group-hover:text-white'>
                        Post
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <p className='italic opacity-50'>Login in add a review</p>
              )}
            </div>

            <div className='mt-12 py-12'>
              {product.reviews &&
                product.reviews.map((review, index) => {
                  return (
                    <div className='pt-4 border-t space-y-3' key={index}>
                      <div className='flex gap-4 items-center'>
                        <div>
                          <h4 className='font-bold'>{review.name}</h4>
                        </div>
                        <div className='w-2 h-2 rounded-full bg-slate-300'></div>
                        <p className='opacity-[40%] italic font-light '>
                          Created on {review.createdAt.substring(0, 10)}
                        </p>
                      </div>
                      <Rating rating={review.rating} />
                      <p className='text-xl pt-8 '>{review.comment}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  } else {
    return <div>Product not found</div>
  }
}

export default ProductPage
