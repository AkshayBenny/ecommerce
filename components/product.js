import React from 'react';

const Product = (props) => {
  return (
    <div className='md:grid grid-cols-2'>
      <img src={props.image} alt={props.title} />
      <div className='space-y-3'>
        <h1 className='text-3xl font-semibold'>{props.title}</h1>
        {/* <p className='font-bold text-xl'>{props.category}</p> */}
        <h2 className='font-light'>{props.description}</h2>
        <p className='text-4xl font-italic'>{props.price}$</p>
        <p>
          {props.rating.rate}({props.rating.count})
        </p>
      </div>
    </div>
  );
};

export default Product;
