import React, { Children } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link } from 'react-router'

const BackButton = () => {
  return (
    <button className='
      btn 
    bg-[#E696AF] 
      border-none 
      translate-all 
      duration-300 
      hover:bg-[#C44569] 
      hover:border-none
      hover:text-white'
      id='clickable'
    >
      <Link to="/" className='flex gap-2.5 items-center font-mono tracking-tighter'>
        <ArrowLeftIcon className='size-5'/>
        Back to Notes
      </Link>
    </button>
  )
}

export default BackButton