import React, { useState } from 'react';
import SignupForm from '../components/Forms/SignupForm';
import Illustration from '../components/Illustration/Illustration';
import Logo from '../components/Logo/Logo';
import useSignup from '../components/Hook/useSignup';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const {signupMutation, isPending, error} = useSignup();

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme='forest'>
      {/* Signup Form Container */}
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* Signup Form - Left Side */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* Signup Form Logo section */}
          <div className='w-full mb-4'>
            <Logo />
          </div>

          {/* Error message if any error occurs */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          {/* Signup Form Input's section */}
          <div className='w-full'>
            <SignupForm
              signupMutation={signupMutation}
              isPending={isPending} 
              signupData={signupData}
              setSignupData={setSignupData}
            />
          </div>
        </div>

        {/* Signup Image - Right Side */}
        <div className='hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-primary/10'>
          <Illustration />
        </div>

      </div>
    </div>
  )
}

export default Signup;
