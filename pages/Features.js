import React from 'react'

const Features = () => {
  return (
    <div className='bg-white lg:space-y-20 md:space-y-10 lg:p-20 md:p-10 p-10 space-y-10'>

        <div className='flex justify-center text-2xl font-bold text-rose-900'>Features & Benefits</div>
        <div className='lg:grid md:grid grid-cols-4 lg:gap-10 md:gap-2 lg:space-y-0 md:space-y-0 space-y-10'>
            <div className='h-32 border border-rose-900 flex justify-center items-center text-md font-extrabold text-rose-900 rounded-xl shadow-xl hover:bg-rose-900 hover:text-white cursor-pointer hover:translate-y-2 duration-500 '>Unlimited Kilometers</div>
            <div className='h-32 border border-rose-900 flex justify-center items-center text-md font-extrabold text-rose-900 rounded-xl shadow-xl hover:bg-rose-900 hover:text-white cursor-pointer hover:translate-y-2 duration-500'>Easy Cancellation</div>
            <div className='h-32 border border-rose-900 flex justify-center items-center text-md font-extrabold text-rose-900 rounded-xl shadow-xl hover:bg-rose-900 hover:text-white cursor-pointer hover:translate-y-2 duration-500'>Secure</div>
            <div className='h-32 border border-rose-900 flex justify-center items-center text-md font-extrabold text-rose-900 rounded-xl shadow-xl hover:bg-rose-900 hover:text-white cursor-pointer hover:translate-y-2 duration-500'>Best Price Guarantee</div>
        </div>

    </div>
  )
}

export default Features