
const TopProducts = ({ data }) => {

  if (data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col lg:flex-row lg:h-screen  max-w-screen'>
      <div className='w-full bg-myPurple p-20 group flex justify-center items-center cursor-pointer'>
        <img
          src={data[0]?.image}
          alt=''
          className='bg-myPurple w-full h-full group-hover:scale-90 transition duration-700'
        />
      </div>
      <div className='flex lg:flex-col lg:w-5/6 w-full'>
        <div className='bg-black cursor-pointer w-full max-h-[50%] group'>
          <img
            src={data[1]?.image}
            alt=''
            className='bg-black w-full h-full object-contain group-hover:scale-90 transition  duration-700'
          />
        </div>
        <div className='bg-myPink w-full cursor-pointer max-h-[50%] group'>
          <img
            src={data[2].image}
            alt=''
            className='bg-myPink w-full h-full object-contain group-hover:scale-90 transition  duration-700'
          />
        </div>
      </div>
    </div>
  )
}

export default TopProducts
