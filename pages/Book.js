import React from 'react'
import { SlCalender } from "react-icons/sl";
import { FaCar } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

const Book = () => {
  return (
    <div className='bg-white lg:p-20 p-6 lg:space-y-20 md:space-y-10 space-y-6'>
       
       <div className='flex justify-center font-bold lg:text-2xl md:text-2xl text-xl text-rose-900'> How to Book a Car Online With G7Cars  </div>

       <div className='lg:grid md:grid grid-cols-4 lg:gap-10 md:gap-2 space-y-10 lg:space-y-0 md:space-y-0'>
        <div className='space-y-10 justify-center border-2 border-rose-900 shadow-xl p-10 rounded-xl'>
          <div className='flex justify-center'><SlCalender size={60} className='text-rose-900' /></div>
          <div className='flex justify-center text-3xl font-bold text-rose-900'>01</div>
          <div className='flex justify-center font-semibold text-rose-900'>Select City & Travel Date</div>
         
          </div>
          <div className='space-y-10 justify-center border-2 border-rose-900 shadow-xl p-10 rounded-xl'>
          <div className='flex justify-center'><FaCar size={60} className='text-rose-900' /></div>
          <div className='flex justify-center text-3xl font-bold text-rose-900'>02</div>
          <div className='flex justify-center font-semibold text-rose-900'>Select Car</div>
         
          </div>
          <div className='space-y-10 justify-center border-2 border-rose-900 shadow-xl p-10 rounded-xl'>
          <div className='flex justify-center'><FaWpforms size={60} className='text-rose-900' /></div>
          <div className='flex justify-center text-3xl font-bold text-rose-900'>03</div>
          <div className='flex justify-center font-semibold text-rose-900'>Verify Yourself</div>
         
          </div>
          <div className='space-y-10 justify-center border-2 border-rose-900 shadow-xl p-10 rounded-xl'>
          <div className='flex justify-center'><MdPayments size={60} className='text-rose-900' /></div>
          <div className='flex justify-center text-3xl font-bold text-rose-900'>04</div>
          <div className='flex justify-center font-semibold text-rose-900'>Make Payment</div>
         
          </div>
       </div>
    </div>
  )
}

export default Book