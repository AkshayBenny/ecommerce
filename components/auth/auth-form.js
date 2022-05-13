import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something wen wrong');
  }
  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler(e) {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      //log user in
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(result);
      if (!result.error) {
        //set auth state
      }
    } else {
      //add new user
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section>
      <h1 className='text-2xl pt-12 text-center'>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      <div className='flex justify-center items-center'>
        <form
          onSubmit={submitHandler}
          className='border space-y-4 rounded px-12 py-6'
        >
          <div className='flex flex-col'>
            <input
              className='border rounded px-4 py-2'
              placeholder='Email'
              type='email'
              id='email'
              ref={emailInputRef}
              required
            />
          </div>
          <div className='flex flex-col'>
            <input
              className='border rounded px-4 py-2'
              placeholder='Password'
              type='password'
              id='password'
              ref={passwordInputRef}
              required
            />
          </div>
          <div className='flex flex-col'>
            <button className='bg-black px-4 py-2 border border-black rounded text-white hover:text-black hover:bg-white transition'>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
            <button
              type='button'
              className='bg-white mt-2 px-4 py-2 border border-black rounded text-black hover:text-white hover:bg-black transition'
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
