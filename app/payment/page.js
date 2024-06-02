"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (!orderId || !amount) {
      router.push("/error");
      return;
    }

    const options = {
      key: "rzp_test_URbADkFMr16GIz", 
      amount: amount * 100, 
      currency: "INR",
      name: "Your Company Name",
      description: "Car Rental Payment",
      order_id: orderId,
      handler: async function (response) {
        try {
          const verifyResponse = await fetch("/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!verifyResponse.ok) {
            throw new Error("Payment verification failed");
          }

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            router.push("/success");
          } else {
            router.push("/failure");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          router.push("/failure");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      router.push("/failure");
    });
  }, [orderId, amount, router]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex justify-center items-center m-10 text-4xl font-bold underline text-rose-900">
        Processing Payment...
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
