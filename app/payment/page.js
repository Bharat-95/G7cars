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
    const params = new URLSearchParams(window.location.search);
    const orderIdParam = params.get('orderId');
    const amountParam = params.get('amount');

    console.log("URL parameters fetched:", { orderIdParam, amountParam });

    if (orderIdParam && amountParam) {
      setOrderId(orderIdParam);
      setAmount(Number(amountParam));
    } else {
      console.log("URL parameters missing or invalid:", { orderIdParam, amountParam });
    }
  }, [router.query]);

  useEffect(() => {
    if (!orderId || !amount || !isLoaded || !user) {
      console.log("Missing parameters:", {
        orderId,
        amount,
        user: user ? { fullName: user.fullName, email: user.primaryEmailAddress?.emailAddress } : null,
      });
      return;
    }

    console.log("All required parameters are available, initializing Razorpay...");

    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="https://checkout.razorpay.com/v1/checkout.js"]`);
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => reject(false);
          document.body.appendChild(script);
        } else {
          resolve(true);
        }
      });
    };

    const initializeRazorpay = async () => {
      try {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert('Failed to load Razorpay SDK. Please try again.');
          return;
        }

        const amountInPaise = amount * 100;
        console.log(`Amount in paise: ${amountInPaise}`);

        const options = {
          key: 'rzp_test_URbADkFMr16GIz',
          amount: amountInPaise, // Ensure amount is multiplied by 100
          currency: 'INR',
          name: 'G7Cars',
          description: 'Car rental payment',
          order_id: orderId,
          handler: async function (response) {
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
                throw new Error('Payment verification failed.');
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
            email: user.primaryEmailAddress.emailAddress,
          },
          theme: {
            color: '#F37254',
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Failed to initialize Razorpay:', error);
        alert('Failed to load Razorpay SDK. Please try again.');
      }
    };

    initializeRazorpay();

  }, [orderId, amount, user, isLoaded, router]);

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
