"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';

const PaymentPage = () => {
  const router = useRouter();
  const { orderId, amount } = router.query;
  const { user } = useUser();

  useEffect(() => {
    if (!orderId || !amount) {
      return;
    }

    const options = {
      key: 'rzp_test_URbADkFMr16GIz',
      amount: amount * 100, // amount in the smallest currency unit (paise)
      currency: "INR",
      name: "G7Cars",
      description: "Car rental payment",
      order_id: orderId,
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        const verifyResponse = await fetch('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
          }),
        });

        if (verifyResponse.ok) {
          alert('Payment successful!');
          router.push('/');
        } else {
          alert('Payment verification failed.');
        }
      },
      prefill: {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', (response) => {
      alert('Payment failed');
    });
  }, [orderId, amount, user, router]);

  return (
    <div>
      <h1>Processing payment...</h1>
    </div>
  );
};

export default PaymentPage;
