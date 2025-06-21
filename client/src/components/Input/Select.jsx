import React from 'react'
import { LANGUAGES } from '../../constants/constants'

const Select = ({ label, name, id, onchange, value, type }) => {
    return (
        <div className='form-control w-full'>
            <label className='label' htmlFor={id}>
                <span className='label-text'>{label}</span>
            </label>

            <select
                value={value}
                name={name}
                id={id}
                onChange={onchange}
                className='select select-bordered w-full'
            >
                <option value="">Select your {type} Language</option>
                {LANGUAGES.map((lang) => (
                    <option key={`${type}-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                    </option>
                ))}
            </select>

        </div>
    )
}

export default Select
