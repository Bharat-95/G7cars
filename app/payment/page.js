"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import Script from 'next/script';
import Head from 'next/head';

const PaymentPage = () => {
  const router = useRouter();
  const { orderId, amount } = router.query || {};
  const { user } = useUser();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!orderId || !amount) {
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
          const verifyResponse = await fetch('https://your-backend-domain.com/verify-payment', {
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
    if (window) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }, [orderId, amount, router, user]);

  return (
    <div>
<form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
  <input type="hidden" name="key_id" value="rzp_test_URbADkFMr16GIz"/>
  <input type="hidden" name="amount" value={amount * 100}/> 
  <input type="hidden" name="order_id" value={orderId}/>
  <input type="hidden" name="name" value="G7Cars"/>
  <input type="hidden" name="description" value="Car rental payment"/>
  <input type="hidden" name="prefill[contact]" value="9123456780"/>
  <input type="hidden" name="notes[shipping address]" value="L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001"/>
  <input type="hidden" name="callback_url" value="https://example.com/payment-callback"/>
  <input type="hidden" name="cancel_url" value="https://example.com/payment-cancel"/>
  <button>Submit</button>
</form>

      {!processing && (
        <button onClick={() => router.push('/')} disabled={processing}>
          Cancel Payment
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
