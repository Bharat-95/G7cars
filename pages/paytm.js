import { useState } from "react";

export default function Paytm() {
  const [formData, setFormData] = useState({
    amount: "",
    customerId: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.txnUrl;

      for (const key in data.params) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.params[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      <h1>Paytm Payment Gateway Integration</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Customer ID:
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
