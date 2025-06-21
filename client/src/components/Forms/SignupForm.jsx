import React, { useState }  from 'react';
import { Link } from 'react-router';
import Input from '../Input/Input';
import Button from '../Button/Button'; 

const SignupForm = ({
    signupData,
    setSignupData,
    signupMutation,
    isPending
}) => {

    const [agreed, setAgreed] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        signupMutation(signupData);
        console.log(signupData);
    }

    return (
        <form onSubmit={handleSignup}>
            <div className='space-y-4'>
                <div>
                    <h2 className='text-xl font-semibold'>Create an Account</h2>
                    <p className='text-sm opacity-70'>
                        Join Streamify and start your language learning adventure!
                    </p>
                </div>
                {/* Signup Form input's section */}
                <div className='space-y-3'>
                    <Input
                        id="signup-fullname"
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        value={signupData.fullName}
                        onChange={e => setSignupData({ ...signupData, fullName: e.target.value })}
                        required
                        autoComplete="on"
                    />

                    <Input
                        id="signup-email"
                        label="Email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={signupData.email}
                        onChange={e => setSignupData({ ...signupData, email: e.target.value })}
                        required
                        autoComplete="on"
                    />

                    <Input
                        id="signup-password"
                        label="Password"
                        type="password"
                        value={signupData.password}
                        onChange={e => setSignupData({ ...signupData, password: e.target.value })}
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
                                    <span>Loading...</span>
                                </>
                            )
                            :
                            (
                                <>
                                    <span>
                                        Create Account
                                    </span>
                                </>
                            )
                    }
                </Button>

                {/* Navigate to Login Page */}
                <div className='text-center mt-4'>
                    <p className='text-sm'>
                        Already have an account?
                        <Link to='/login' className='ml-1 text-primary hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </form>
    )
}

export default SignupForm
