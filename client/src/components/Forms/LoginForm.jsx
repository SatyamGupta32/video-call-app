import React, { useState } from 'react';
import { Link } from 'react-router';
import Input from '../Input/Input';
import Button from '../Button/Button';

const LoginForm = ({              
    loginMutation,
    isPending,
    loginData,
    setLoginData
}) => {

    
  const [agreed, setAgreed] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation(loginData);
    }
    return (
        <form onSubmit={handleLogin}>
            <div className='space-y-4'>
                <div>
                    <h2 className='text-xl font-semibold'>Welcome Back</h2>
                    <p className='text-sm opacity-70'>
                        Sign in to Streamify and continue to your learning journey !
                    </p>
                </div>

                {/* Signup Form input's section */}
                <div className='space-y-3'>

                    <Input
                        id="login-email"
                        label="Email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={loginData.email}
                        onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        autoComplete="on"
                    />

                    <Input
                        id="login-password"
                        label="Password"
                        type="password"
                        value={loginData.password}
                        onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        autoComplete="on"
                    />

                    <p className='text-sm opacity-70 mt-1'>
                        Password must be at least 8 characters long
                    </p>

                    <div className='form-control'>
                        <label className='label cursor-pointer justify-start gap-2'>
                            <input
                                type="checkbox"
                                className='checkbox checkbox-sm'
                                required
                                checked={agreed}
                                onChange={e => setAgreed(e.target.checked)}
                            />
                            <span className='text-sm leading-tight'>
                                I agree to the
                                <span className='text-primary hover:underline'> Terms of services</span> and
                                <span className='text-primary hover:underline'> Privacy policy</span>
                            </span>
                        </label>
                    </div>
                </div>


                {/* Signup button */}
                <Button disabled={!agreed}>
                    {
                        isPending ?
                            (
                                <>
                                    <span className='loading loading-spinner loading-xs'></span>
                                    <span>Loging in...</span>
                                </>
                            )
                            :
                            (
                                <>
                                    <span>
                                        Login Account
                                    </span>
                                </>
                            )
                    }
                </Button>

                {/* Navigate to Login Page */}
                <div className='text-center mt-4'>
                    <p className='text-sm'>
                        Don't have an account? 
                        <Link to='/signup' className='ml-1 text-primary hover:underline'>
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
