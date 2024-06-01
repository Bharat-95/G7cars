const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/order', {
        amount: 1000, 
      });
      const { data } = response;
      const orderId = data.id; 
      redirectToRazorpayCheckout(orderId);
    } catch (error) {
      console.error('Error initiating payment:', error);

    } finally {
      setLoading(false);
    }
  };

  const redirectToRazorpayCheckout = (orderId) => {
    const options = {
      key: 'rzp_test_URbADkFMr16GIz',
      amount: 1000, 
      currency: 'INR',
      order_id: orderId,
      name: 'Your Company Name',
      description: 'Payment for Product/Service',
      handler: function (response) {
        
        console.log('Payment successful:', response);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9876543210',
      },
      notes: {
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={initiatePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default PaymentPage;
