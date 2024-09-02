"use client"
import React, { useState, useEffect } from 'react';
import { useUser, SignedIn } from '@clerk/clerk-react';
import Header from '../Header';
import Footer from '../Footer';

const Page = () => {
  const [data, setData] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const { user, isLoaded } = useUser();

  const fetchData = async () => {
    if (!user) return;

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
    if (isLoaded && user) {
      fetchData();
    }
  }, [isLoaded, user]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  if (!isLoaded) {
    return <div>Loading user information...</div>;
  }

  return (
    <SignedIn className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-screen-lg">
          {data.length > 0 ? (
            data.map((booking) => (
              <div
                key={booking.bookingId}
                className="text-[#881337] flex items-center justify-between shadow-lg rounded-xl m-4 p-4 bg-white"
              >
                {carDetails[booking.carId] && (
                  <div className="flex-shrink-0 w-1/3">
                    <img
                      src={carDetails[booking.carId].Coverimage[0]}
                      alt={carDetails[booking.carId].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="ml-4 flex-grow">
                  {carDetails[booking.carId] && (
                    <div>
                      <div className="text-lg font-semibold">Car Name: {carDetails[booking.carId].Name}</div>
                    </div>
                  )}
                  <div>Pickup DateTime: {formatDate(booking.pickupDateTime)}</div>
                  <div>Dropoff DateTime: {formatDate(booking.dropoffDateTime)}</div>
                  <div>Payment ID: {booking.paymentId}</div>
                </div>
              </div>
            ))
          ) : (
            <div>No bookings found</div>
          )}
        </div>
      </div>
      <Footer />
    </SignedIn>
  );
};

export default Page;
