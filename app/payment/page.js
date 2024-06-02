"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

const PaymentPage = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(null);
  const { user } = useUser();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderIdParam = params.get('orderId');
    const amountParam = params.get('amount');

    if (orderIdParam && amountParam) {
      setOrderId(orderIdParam);
      setAmount(amountParam);
    }
  }, [router.query]);

  useEffect(() => {
    if (!orderId || !amount || !user) {
      return;
    }

    const initializeRazorpay = async () => {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please try again.');
        return;
      }

      const options = {
        key: 'rzp_test_URbADkFMr16GIz',
        amount: amount * 100,
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
    };

    initializeRazorpay();

  }, [orderId, amount, user]);

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
