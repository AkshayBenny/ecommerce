import React from 'react';
import { useDispatch } from 'react-redux';
import { decrement } from '../../slice/counterSlice';

const Decrement = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrement())} className='border rounded'>
        Decrement state
      </button>
    </div>
  );
};

export default Decrement;
