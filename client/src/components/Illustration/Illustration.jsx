import React from 'react';

const Illustration = () => {
    return (
        <div className='max-w-full'>
            {/* Illustrator Image */}
            <div className='relative aspect-square max-w-sm mx-auto'>
                <img src="/Video-Call.png" alt="Language connection illustration" className='w-full h-full object-cover object-center' />
            </div>

            <div className='text-center space-y-3 mt-2'>
                <h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
                <p className='text-sm opacity-70'>
                    Practice conversations, make friends, & Improve your language skill together
                </p>
            </div>
        </div>
    )
}

export default Illustration
