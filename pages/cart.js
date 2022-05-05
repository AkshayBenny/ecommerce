import React from 'react';

const cart = ({ cart }) => {
  console.log(cart);
  return <div>{
      cart.products.map((product,index)=> {
          return <div key={index}></div>
      })
}</div>;
};

export default cart;

export async function getServerSideProps() {
  const userId = 2;
  const response = await fetch('https://fakestoreapi.com/carts');
  const data = await response.json();
  const userCart = data.find((item) => item.userId == userId);
  return {
    props: {
      cart: userCart,
    },
  };
}
