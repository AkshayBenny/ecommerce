import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../../slice/counterSlice';

const Increment = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(increment())} className='border rounded'>
        Increment state
      </button>
    </div>
  );
};

export default Increment;
