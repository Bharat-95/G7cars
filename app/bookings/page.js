"use client"
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Header from '../Header';
import Footer from '../Footer';

const Page = () => {
  const [data, setData] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const { user } = useUser();

  console.log(user.id)

  const fetchData = async () => {
    try {
      const bookingsUrl = `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/bookings/${user.id}`;
      const bookingsResponse = await fetch(bookingsUrl);
      const bookingsData = await bookingsResponse.json();
      setData(bookingsData);

      const carDetailsPromises = bookingsData.map(async (booking) => {
        const carUrl = `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars/${booking.carId}`;
        const carResponse = await fetch(carUrl);
        const carData = await carResponse.json();
        return { carId: booking.carId, carData };
      });

      const carDetailsArray = await Promise.all(carDetailsPromises);
      const carDetailsObject = carDetailsArray.reduce((acc, { carId, carData }) => {
        acc[carId] = carData;
        return acc;
      }, {});

      setCarDetails(carDetailsObject);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      <Header />
      {data.length > 0 ? (
        data.map((booking) => (
          <div key={booking.bookingId} className='text-white justify-center items-center'>
            <div>Booking ID: {booking.bookingId}</div>
            <div>Car ID: {booking.carId}</div>
            <div>Pickup DateTime: {booking.pickupDateTime}</div>
            <div>Dropoff DateTime: {booking.dropoffDateTime}</div>
            <div>Payment ID: {booking.paymentId}</div>
            {carDetails[booking.carId] && (
              <div>
                <div>Car Name: {carDetails[booking.carId].name}</div>
                <img src={carDetails[booking.carId].Coverimage[0]} alt={carDetails[booking.carId].name} />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No bookings found</div>
      )}
      <Footer />
    </div>
  );
};

export default Page;
