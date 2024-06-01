"use client"
import { useState } from 'react';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
      }),
    });

    const data = await response.json();

    if (data.id) {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentPage;
