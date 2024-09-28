"use client";
import React, { useState, useEffect } from "react";
import { useUser, SignedIn } from "@clerk/clerk-react";
import Header from "../Header";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const Page = () => {
  const [data, setData] = useState([]);
  const [carDetails, setCarDetails] = useState({});
  const [extendedDate, setExtendedDate] = useState({});
  const { user, isLoaded } = useUser();
  const router = useRouter();

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
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      fetchData();
    }
  }, [isLoaded, user]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(dateString));
  };

  const handleExtendBooking = (bookingId, minDate) => {
    setExtendedDate((prev) => ({
      ...prev,
      [bookingId]: {
        isExtending: true,
        minDate: new Date(minDate),
        selectedDate: null,
      },
    }));
  };

  const handleDateChange = (date, bookingId) => {
    setExtendedDate((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        selectedDate: date,
      },
    }));
  };

  const saveExtendedBooking = async (booking, bookingId) => {
    const newDropoffDateTime = extendedDate[bookingId]?.selectedDate;

    if (!newDropoffDateTime) {
      alert("Please select a new drop-off date and time");
      return;
    }

    const originalDropoffDateTime = new Date(booking.dropoffDateTime);

    // Ensure the new date is after the original drop-off date
    if (newDropoffDateTime <= originalDropoffDateTime) {
      alert("New drop-off date must be after the original drop-off date.");
      return;
    }

    // Prepare the request to update the drop-off date
    try {
      const response = await fetch("https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/update-dropoff-date", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
          newDropoffDateTime: newDropoffDateTime.toISOString(),
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update booking: ${JSON.stringify(errorDetails)}`);
      }

      const result = await response.json();
      alert("Booking extended successfully!");
      setExtendedDate((prev) => ({
        ...prev,
        [bookingId]: {
          ...prev[bookingId],
          isExtending: false, // Reset extending state
        },
      }));
    } catch (error) {
      console.error("Error extending booking:", error);
      alert(`An error occurred while extending your booking. Please try again.\nError details: ${error.message}`);
    }
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
                      <div className="text-lg font-semibold">
                        Car Name: {carDetails[booking.carId].Name}
                      </div>
                    </div>
                  )}
                  <div>Pickup DateTime: {formatDate(booking.pickupDateTime)}</div>
                  <div>Dropoff DateTime: {formatDate(booking.dropoffDateTime)}</div>
                  <div>Payment ID: {booking.paymentId}</div>
                  <div>Status: {booking.status}</div>

                  {booking.status === "Active" && !extendedDate[booking.bookingId]?.isExtending && (
                    <button
                      onClick={() => handleExtendBooking(booking.bookingId, booking.dropoffDateTime)}
                      className="mt-2 bg-black text-white font-bold py-2 px-4 rounded"
                    >
                      Extend Booking
                    </button>
                  )}

                  {extendedDate[booking.bookingId]?.isExtending && (
                    <div>
                      <DatePicker
                        selected={extendedDate[booking.bookingId]?.selectedDate}
                        onChange={(date) => handleDateChange(date, booking.bookingId)}
                        showTimeSelect
                        timeFormat="h:mm aa"
                        timeIntervals={15}
                        dateFormat="dd/MM/yyyy h:mm aa"
                        minDate={extendedDate[booking.bookingId]?.minDate}
                        className="mt-4 border p-2 rounded"
                        inline
                      />

                      <button
                        onClick={() => saveExtendedBooking(booking, booking.bookingId)}
                        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No bookings found.</p>
          )}
        </div>
      </div>
      <Footer />
    </SignedIn>
  );
};

export default Page;
