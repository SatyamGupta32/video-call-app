import React from 'react';

const Button = ({ children, disabled }) => {
    return (
        <button 
            className={`btn ${disabled ? 'btn-primary opacity-20 cursor-not-allowed' : 'btn-primary opacity-100 cursor-pointer'} transition-all w-full`}
            type='submit'
        >
            {children}
        </button>
    )
}

export default Button
