import React from 'react'
import useAuthUser from '../Hook/useAuthUser';
import { Link, useLocation } from 'react-router';
import useLogout from '../Hook/useLogout';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from '../ThemeSelctor/ThemeSelector';

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith('/chat/');
    const { logoutMutation, isPending, error } = useLogout();

    const handleLogout = (e) => {
        e.preventDefault();
        logoutMutation();
    }

    return (
        <div className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
            <div className='container py-3 mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-end w-full'>
                    {isChatPage && (
                        <div className='pl-5'>
                            <Link to="/" className='flex items-center gap-2.5'>
                                <ShipWheelIcon className='size-9 text-primary' />
                                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                                    Streamify
                                </span>
                            </Link>
                        </div>
                    )}

                    <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
                        <Link to="/notifications">
                            <button className='btn btn-ghost btn-circle'>
                                <BellIcon className='h-6 w-6 text-base-content opacity-70 ' />
                            </button>
                        </Link>
                    </div>

                    <ThemeSelector />

                    <div className='avatar'>
                        <div className='w-9 rounded-full'>
                            <img
                                src={authUser?.profilePicture} alt="User Avatar"
                                rel='nonreferrer'
                            />
                        </div>
                    </div>

                    <button className='btn btn-ghost btn-circle' onClick={handleLogout}>
                        <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar
