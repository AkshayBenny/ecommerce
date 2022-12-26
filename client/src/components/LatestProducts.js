
const LatestProducts = ({ products }) => {
  console.log(products)
  return (
    <div className='slider bg-black'>
      <div className='slide-track'>
        {products?.map((item, index) => {
          return (
            <div key={index} className='slide bg-black mx-12'>
              <img src={item.image} alt='' className='bg-black w-full' />
            </div>
          )
        })}
        {products?.map((item, index) => {
          return (
            <div key={index} className='slide bg-black mx-12'>
              <img src={item.image} alt='' className='bg-black w-full' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LatestProducts
