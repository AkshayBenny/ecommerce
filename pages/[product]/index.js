import React from 'react';

const Product = ({ product }) => {
  return <div>Product page</div>;
};

export default Product;

export async function getStaticProps() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();

  return {
    props: {
      product: data,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  const paramsArray = [];
  data.map((item) => {
    paramsArray.push({ params: { id: item.id } });
  });
  return {
    paths: paramsArray,
    fallback: true,
  };
}
