import React from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowLeftIcon, PlusIcon, ScrollText } from 'lucide-react'

const Navbar = () => {

  const location = useLocation();

  return (
    <header className='bg-[#FFD9E5] border-b border-[#E696AF] rounded-b-3xl'>
        <div className='mx-auto max-w-7xl p-3 lg:p-4'>
            <div className='flex items-center justify-between'>
                <Link to='/' className='flex items-center gap-2 group'>
                    <ScrollText className='text-gray-700                transition-colors 
                    duration-300
                    group-hover:text-[#C44569]'/>
                    <div className='relative '>
                        <h1 className="
                            text-2xl
                            lg:text-3xl
                            font-bold
                            text-gray-700
                            font-mono
                            tracking-tight
                            transition-colors
                            duration-300
                            group-hover:text-[rgb(196,69,105)]
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
                
                

                
                
                <Link
                    to="/create"
                    id='clickable'
                    className={`btn 
                        bg-[#E696AF] 
                        border-none 
                        transition-all 
                        duration-300 
                        flex
                        items-center
                        font-mono
                        hover:bg-[#C44569]
                        hover:border-none
                        group
                        ${location.pathname === "/create" ? "invisible" : ""}
                    `}
                >
                    <PlusIcon className='size-4 lg:size-5 text-gray-800 group-hover:text-white' />
                    <h3 className='font-mono text-gray-800 group-hover:text-white text-sm'>
                        New Note
                    </h3>
                </Link>
                
                

                    
               
            </div>
        </div>
    </header>
  )
}

export default Navbar