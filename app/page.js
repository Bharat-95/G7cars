import React from 'react'
import Header from './Header'
import '../app/globals.css'
import Banner from '../app/banner/page'
import Footer from './Footer'
import Book from '@/pages/Book'
import Features from '@/pages/Features'
import Cars from '@/pages/Cars'


const page = () => {
  return (
    <div className='min-h-screen max-h-full'>
      <Header />
      <div className='bg-[#881337] h-1 rounded-xl shadow-md w-screen px-2'></div>
      <div><Banner /></div>
      <div><Cars /></div>
      <div><Book /></div>
      <div><Features /></div>
     <Footer />
    </div>
  )
}

export default page