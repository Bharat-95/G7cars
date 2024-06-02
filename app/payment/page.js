"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

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

    console.log("URL parameters fetched:", { orderIdParam, amountParam });

    if (orderIdParam && amountParam) {
      setOrderId(orderIdParam);
      const parsedAmount = Number(amountParam);
      if (!isNaN(parsedAmount)) {
        setAmount(parsedAmount);
      } else {
        console.error('Invalid amount parameter:', amountParam);
      }
    } else {
      console.log("URL parameters missing or invalid:", { orderIdParam, amountParam });
    }

    const loadRazorpayScript = async () => {
      try {
        const existingScript = document.querySelector(`script[src="https://checkout.razorpay.com/v1/checkout.js"]`);
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }
      } catch (error) {
        console.error('Failed to load Razorpay SDK:', error);
        alert('Failed to load Razorpay SDK. Please try again.');
      }
    };

    const initializeRazorpay = async () => {
      if (!orderId || !amount || !user) return;

      try {
        await loadRazorpayScript();

        const amountInPaise = Math.round(amount * 100);

        const options = {
          key: process.env.RAZORPAY_API_KEY,
          amount: amountInPaise,
          currency: 'INR',
          name: 'G7Cars',
          description: 'Car rental payment',
          order_id: orderId,
          handler: async function (response) {
            console.log('Payment handler response:', response);
            try {
              setProcessing(true);
              const verifyResponse = await fetch('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/verify-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                }),
              });
              if (verifyResponse.ok) {
                alert('Payment successful!');
                router.push('/');
              } else {
                const errorMessage = await verifyResponse.text();
                throw new Error(`Payment verification failed: ${errorMessage}`);
              }
            } catch (error) {
              console.error('Error confirming payment:', error);
              alert('Payment failed.');
            } finally {
              setProcessing(false);
            }
          },
          prefill: {
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
          },
          theme: {
            color: '#F37254',
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
        alert('Failed to initialize Razorpay. Please try again.');
      }
    };

    initializeRazorpay();

  }, [isLoaded, user, router]);

  return (
    <div>
      {!processing && orderId && amount && user && (
        <button onClick={() => router.push('/')} disabled={processing}>
          Cancel Payment
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
