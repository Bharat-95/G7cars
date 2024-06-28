"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const Page = () => {
  const [data, setData] = useState([]);
  const { user } = useUser();

  const fetchData = async () => {
    try {
      const url = `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/bookings/${user.id}`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      {data.length > 0 ? (
        data.map((booking) => (
          <div key={booking.bookingId}>
            <div>Booking ID: {booking.bookingId}</div>
            <div>Car ID: {booking.carId}</div>
            <div>Pickup DateTime: {booking.pickupDateTime}</div>
            <div>Dropoff DateTime: {booking.dropoffDateTime}</div>
            <div>Payment ID: {booking.paymentId}</div>
          </div>
        ))
      ) : (
        <div>No bookings found</div>
      )}
    </div>
  );
};

export default Page;
