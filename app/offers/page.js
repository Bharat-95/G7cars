import React from 'react'
import Header from '../Header'
import Link from 'next/link'
import Footer from '../Footer'
import { SignedIn } from '@clerk/nextjs'

const page = () => {
  return (
    <SignedIn>
        <Header />
        <div className=' bg-white m-20 min-h-screen shadow-2xl border-[4px] rounded-xl border-rose-900'>
            <div className='p-10 text-2xl font-bold text-rose-950 flex justify-center'>Car Rental Deals & Offers</div>
             <div className='flex justify-center gap-10 text-white'>
            <Link href='/' className='bg-rose-900 w-36 h-10 rounded-xl shadow-xl hover:opacity-90 flex justify-center items-center'>Daily Offers</Link>
            <Link href='/' className='bg-rose-900 w-36 h-10 rounded-xl shadow-xl hover:opacity-90 flex justify-center items-center'>Monthly Offers</Link>
            </div>
            <div className='grid grid-cols-3'>

            </div>
            
        </div>
        <Footer />
        
    </SignedIn>
  )
}

export default page