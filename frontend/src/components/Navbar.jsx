import React from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'

const Navbar = () => {

  const location = useLocation();

  return (
    <header className='bg-secondary/30 border-b border-base-content/10'>
        <div className='mx-auto max-w-6xl p-4 h-15'>
            <div className='flex  items-center justify-between h-12'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
                    NoTicker
                </h1>

                <div className='flex items-center'>
                    {location.pathname !== "/create" ? (
                        <>
                            <Link to={"/create"} className='btn btn-primary'>
                                <PlusIcon className='size-5  text-gray-800'/>
                                <h3 className='font-mono text-base text-gray-800'>New Note</h3>
                            </Link>
                        </>)
                        
                        :(
                        <>
                            <Link to={"/"} className='btn btn-primary'>
                                <ArrowLeftIcon className='size-5  text-gray-800 color'/>
                                <h3 className='font-mono text-base text-gray-800'>Back to Notes</h3>
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