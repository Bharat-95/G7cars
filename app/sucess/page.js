"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import Footer from '../Footer';

const SuccessPage = () => {
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('orderId');
  const pickupDate = new Date(params.get('pickupDate'));
  const dropDate = new Date(params.get('dropDate'));
  const amount = params.get('amount');

  return (
    <div className='min-h-screen'>
      <Header />
      <div className='flex flex-col justify-center items-center text-white h-screen '>
        <h1 className='text-2xl font-bold mb-4'>Payment Successful!</h1>
        <p>Order ID: {orderId}</p>
        <p>Pickup Date: {pickupDate.toLocaleString()}</p>
        <p>Drop Date: {dropDate.toLocaleString()}</p>
        <p>Amount Paid: ₹{amount}</p>
        <button
          onClick={() => router.push('/')}
          className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Go to Home
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
