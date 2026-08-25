import React from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowLeftIcon, PlusIcon, ScrollText } from 'lucide-react'

const Navbar = () => {

  const location = useLocation();

  return (
    <header className='bg-[#FFD9E5] border-b border-[#E696AF]'>
        <div className='mx-auto max-w-6xl p-4 h-15'>
            <div className='flex  items-center justify-between h-12'>
                <Link to='/' className='flex items-center gap-2 group'>
                    <ScrollText className='text-gray-700                transition-colors 
                    duration-300
                    group-hover:text-[#C44569]'/>
                
                    <div className='relative '>
                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-700
                            font-mono
                            tracking-tight
                            transition-colors
                            duration-300
                            group-hover:text-[#C44569]
                        ">
                            NoTicker
                        </h1>
                        
                        <div className="
                            h-0.5
                            bg-[#C44569]
                            w-0
                            group-hover:w-full
                            transition-all
                            duration-300
                        "/>
                    </div>
                </Link>
                
                

                <div className='flex items-center'>
                    {location.pathname !== "/create" && (
                        <>
                            <Link to={"/create"} className='btn bg-[#E696AF] translate-all duration-300 hover:bg-[#C44569] hover:border-none'>
                                <PlusIcon className='size-5  text-gray-800'/>
                                <h3 className='font-mono text-base text-gray-800'>New Note</h3>
                            </Link>
                        </>)
                    }
                

                    
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar