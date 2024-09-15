"use client";
import React, { useState, useEffect } from 'react';
import { useUser, SignedIn } from '@clerk/clerk-react';
import Header from '../Header';
import Footer from '../Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Page = () => {
  const [data, setData] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const [extendedDate, setExtendedDate] = useState({});
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
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  const handleExtendBooking = (bookingId, dropoffDateTime) => {
    // When "Extend Booking" is clicked, show the DatePicker for this booking and set the min date
    setExtendedDate((prev) => ({
      ...prev,
      [bookingId]: {
        isExtending: true,
        minDate: new Date(dropoffDateTime),
        selectedDate: null, // Clear the selected date initially
      },
    }));
  };

  const handleDateChange = (date, bookingId) => {
    setExtendedDate((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        selectedDate: date, // Save selected date
      },
    }));
  };

  const saveExtendedBooking = async (bookingId) => {
    const newDropoffDateTime = extendedDate[bookingId]?.selectedDate;

    if (!newDropoffDateTime) {
      alert('Please select a new drop-off date and time');
      return;
    }

    try {
      const response = await fetch(
        `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/bookings/extend/${bookingId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newDropoffDateTime }),
        }
      );
      if (response.ok) {
        alert('Booking extended successfully');
        setExtendedDate((prev) => ({
          ...prev,
          [bookingId]: {
            ...prev[bookingId],
            isExtending: false, // Close the calendar after the extension is saved
          },
        }));
        fetchData(); // Reload bookings data
      } else {
        console.error('Failed to extend booking');
      }
    } catch (error) {
      console.error('Error extending booking:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading user information...</div>;
  }

  return (
    <SignedIn className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-screen">
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
                  <div>Status: {booking.status}</div>

                  {/* Show Extend button or DatePicker */}
                  {booking.status === 'Active' && !extendedDate[booking.bookingId]?.isExtending && (
                    <button
                      onClick={() => handleExtendBooking(booking.bookingId, booking.dropoffDateTime)}
                      className="mt-2 bg-black text-white font-bold py-2 px-4 rounded"
                    >
                      Extend Booking
                    </button>
                  )}

                  {/* Calendar opens and Extend Booking button is hidden */}
                  {extendedDate[booking.bookingId]?.isExtending && (
                    <div>
                      <DatePicker
                        selected={extendedDate[booking.bookingId]?.selectedDate}
                        onChange={(date) => handleDateChange(date, booking.bookingId)}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        minDate={extendedDate[booking.bookingId]?.minDate} // Ensure date is later than dropoff
                        className="mt-4 border p-2 rounded"
                        inline // Calendar shows inline
                      />

                      {/* Show selected date and time after user selects it */}
                      {extendedDate[booking.bookingId]?.selectedDate && (
                        <div className="mt-4">
                          <p className="font-semibold">
                            New Dropoff DateTime: {formatDate(extendedDate[booking.bookingId]?.selectedDate)}
                          </p>
                          <button
                            onClick={() => saveExtendedBooking(booking.bookingId)}
                            className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                          >
                            Confirm New Dropoff Date
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
