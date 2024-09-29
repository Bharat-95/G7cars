"use client"
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


  const renderCarStatus = (carStatus) => {
    const statuses = ["Preparing", "Washing", "Ready"];

  const getStatusColor = (status) => {
    if (carStatus === "Ready") {
      return "bg-rose-300"; 
    }
    return status === "Preparing" || status === "Washing" ? "bg-rose-300" : "bg-gray-300";
  };

  return (
    <div className="flex items-center my-4 space-x-10">
      {statuses.map((status, index) => (
        <div key={status} className={`relative ${carStatus === status ? "font-bold  text-white" : ""}`}>
          <span className={`px-4 py-2 rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
          {index < statuses.length - 1 && (
            <div
              className={`absolute top-1/2 left-full transform -translate-y-1/2 w-10 h-1 ${getStatusColor(status)}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};


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

  const handleExtendBooking = (bookingId, originalDropoffDateTime) => {
    const minDate = new Date(new Date(originalDropoffDateTime).getTime() + 4 * 60 * 60 * 1000);
    
    setExtendedDate((prev) => ({
      ...prev,
      [bookingId]: {
        isExtending: true,
        minDate: minDate,
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

  // Updated filterTime function to accept bookingId as a parameter
  const filterTime = (time, bookingId) => {
    const minTime = extendedDate[bookingId]?.minDate;
    return minTime ? time >= minTime : true; // Return true if minTime is not set
  };

  const saveExtendedBooking = async (booking, bookingId, pickupDateTime, selectedCar) => {
    const newDropoffDateTime = extendedDate[bookingId]?.selectedDate;

    if (!newDropoffDateTime) {
      alert("Please select a new drop-off date and time");
      return;
    }

    const originalDropoffDateTime = new Date(booking.dropoffDateTime);
    const timeDifference = newDropoffDateTime - originalDropoffDateTime;
    const hours = Math.ceil(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    if (days < 0 || (days === 0 && remainingHours < 0)) {
      alert("New drop-off date must be after the original drop-off date.");
      return;
    }

    const carPricePerDay = parseFloat(selectedCar.Price.replace(/[^\d.-]/g, ""));
    console.log("Car Price:", carPricePerDay)
    const carPricePerHour = carPricePerDay / 24;
    let totalPrice = Math.round((carPricePerDay * days) + (carPricePerHour * remainingHours));
    let discountAmount = 0;

    if (days >= 10) {
      discountAmount = Math.round(totalPrice * 0.1);
      totalPrice -= discountAmount;
    } else if (days >= 4) {
      discountAmount = Math.round(totalPrice * 0.05);
      totalPrice -= discountAmount;
    }

    try {
      const orderResponse = await fetch(
        "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Math.round(totalPrice),
            currency: "INR",
          }),
        }
      );

      if (!orderResponse.ok) {
        const errorDetails = await orderResponse.json();
        throw new Error(`Failed to create order: ${JSON.stringify(errorDetails)}`);
      }

      const orderData = await orderResponse.json();
      const orderId = orderData.orderId;

      router.push(
        `/payment?orderId=${orderId}&amount=${totalPrice}&carId=${selectedCar.G7cars123}&pickupDateTime=${pickupDateTime}&dropoffDateTime=${newDropoffDateTime.toISOString()}&discount=${discountAmount}&bookingId=${bookingId}`
      );

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
                  <div>Booking ID: {booking.bookingId}</div>
                  <div>Status: {booking.status}</div>
                   <div>{renderCarStatus(booking.carStatus)} </div>

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
                        filterTime={(time) => filterTime(time, booking.bookingId)} 
                        className="mt-4 border p-2 rounded"
                        inline
                      />

                      <button
                        onClick={() => saveExtendedBooking(booking, booking.bookingId, booking.pickupDateTime, carDetails[booking.carId])}
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
