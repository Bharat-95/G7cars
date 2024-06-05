"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import Header from '../Header';
import Footer from '../Footer';

const PaymentPage = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;
  
    const params = new URLSearchParams(window.location.search);
    const orderIdParam = params.get('orderId');
    const amountParam = params.get('amount');
    
    if (orderIdParam) {
      setOrderId(orderIdParam);
      console.log('orderId:', orderIdParam)
      const parsedAmount = Number(amountParam);
      if (!isNaN(parsedAmount)) {
        setAmount(parsedAmount);
      } else {
        console.error('Invalid amount parameter:', amountParam);
      }
    } else {
      console.error('orderId parameter is missing');
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="https://checkout.razorpay.com/v1/checkout.js"]`);
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
          document.body.appendChild(script);
        } else {
          resolve(true);
        }
      });
    };

    const initializeRazorpay = async () => {
      if (!orderId || !amount || !user) return;

      try {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert('Failed to load Razorpay SDK. Please try again.');
          return;
        }

        const amountInPaise = amount * 100;
        var options = {
          key: process.env.RAZORPAY_API_KEY,
          amount: amountInPaise,
          currency: "INR",
          name: 'G7Cars',
          description: 'Car rental payment',
          order_id: orderId,
          handler: async function (response) {
            try {
              setProcessing(true);
              const verifyResponse = await fetch('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  signature: response.razorpay_signature,
                  paymentId: response.razorpay_payment_id
                }),
              });

              const responseBody = await verifyResponse.text();

              if (verifyResponse.ok) {
                alert('Payment successful!');
                router.push('/success');
              } else {
                console.error(`Payment verification failed: ${responseBody}`);
                throw new Error(`Payment verification failed: ${responseBody}`);
              }
            } catch (error) {
              console.error('Unable to process the payment:', error);
              alert('Payment failed.');
              const timer = setTimeout(() => {
                router.push('/');
              }, 6000);
            } finally {
              setProcessing(false);
            }
          },
          prefill: {
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress || '',
          },
          theme: {
            color: '#881337',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          alert('Payment failed. Please try again.');
          setProcessing(false);
        });

        rzp.open();
      } catch (error) {
        console.error('Failed to initialize Razorpay:', error);
        alert('Failed to load Razorpay SDK. Please try again.');
      }
    };

    if (orderId && amount && user) {
      initializeRazorpay();
    }
  }, [orderId, amount, user, router]);

  return (
    <div className='min-h-screen'>
      <Header />
      <div className='flex justify-center items-center text-white h-screen'>
      {processing ? 'Processing your payment, please wait...' : 'Please wait...'}
    </div>
    <Footer />
    </div>
  );
};

export default PaymentPage;
