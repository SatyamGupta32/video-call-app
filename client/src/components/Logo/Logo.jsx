import React from 'react';
import { ShipWheelIcon } from 'lucide-react';

const Logo = () => {
    return (
        <div className='flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                Streamify
            </span>
        </div>
    )
}

export default Logo
