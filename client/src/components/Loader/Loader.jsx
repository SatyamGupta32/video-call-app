import React from 'react';
import { LoaderIcon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore.js'

const Loader = () => {
  const { theme } = useThemeStore();

  return (
    <div className='min-h-screen flex gap-3 items-center justify-center' data-theme={theme}>
      <LoaderIcon className='animate-spin size-16 text-primary'/>
      <span className='text-primary text-4xl font-bold ml-2'>Loading...</span>
    </div>
  )
}

export default Loader
