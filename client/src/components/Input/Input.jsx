import React, { useState } from 'react';
import { Eye, EyeClosed, MapPinIcon } from 'lucide-react';


const Input = ({ value, onChange, label, placeholder, type, autoComplete, id, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const getPlaceholder = () => {
    if (type === 'password') {
      return showPassword ? 'Enter password' : '•••••••••';
    }
    if (type === 'email') {
      return placeholder || 'Enter email';
    }
    return placeholder;
  };
  return (
    <div className='form-control w-full'>
      <label className='label' htmlFor={id}>
        <span className='label-text'>{label}</span>
      </label>

      <div className='relative'>
        {label === "Location" && (
          <MapPinIcon className='absolute top-1/2 -translate-y-1/2 left-3 size-5 text-base-content opacity-70' />
        )}

        <input
          id={id}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          className={`input input-bordered w-full ${type === 'password' ? 'pr-10' : ''} ${!showPassword && type === 'password' ? 'font-extrabold tracking-[3px]' : 'font-normal tracking-normal'} ${label === 'Location' && 'pl-10'}`}
          onChange={onChange}
          placeholder={getPlaceholder()}
          autoComplete={autoComplete}
          required={required}
        />
        
        {type === 'password' && (
          <span className='absolute inset-y-0 right-5 flex items-center cursor-pointer'>
            {showPassword ? (
              <Eye
                size={22}
                className='text-primary'
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeClosed
                size={22}
                className='text-slate-400'
                onClick={toggleShowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div >
  )
}

export default Input;
