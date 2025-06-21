import React from 'react'

const Textarea = ({
    children,
    label,
    id,
    value,
    onChange,
    placeholder
}) => {
    return (
        <div className='form-control w-full'>
            <label className='label' htmlFor={id}>
                <span className='label-text'>{label}</span>
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                className='textarea textarea-bordered h-24'
                placeholder={placeholder} 
            >
                {children}
            </textarea>
        </div>
    )
}

export default Textarea
