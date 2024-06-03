"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios'; // Importing axios

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
    if (orderIdParam && amountParam) {
      setOrderId(orderIdParam);
      const parsedAmount = Number(amountParam);
      if (!isNaN(parsedAmount)) {
        setAmount(parsedAmount);
      } else {
        console.error('Invalid amount parameter:', amountParam);
      }
    } 

    return () => {
    };
  }, [isLoaded, user]);

  useEffect(() => {
    if (orderId && amount) {
      displayRazorpay();
    }
  }, [orderId, amount]);

  async function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      const result = await axios.post("https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/order");

      if (result.data) {
        const { amount, id: order_id, currency } = result.data;

        const options = {
          key: "rzp_test_r6FiJfddJh76SI",
          amount: amount.toString(),
          currency: currency,
          name: "G7 Cars",
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const verifyResult = await axios.post("https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/verify-payment", data);

            alert(verifyResult.data.msg);
          },
          prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Soumya Dey Corporate Office",
          },
          theme: {
            color: "#61dafb",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert("Server error. Are you online?");
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className='flex justify-center items-center text-white'>
      Please wait......
    </div>
  );
};

export default PaymentPage;
