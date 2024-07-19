"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmingBooking, setConfirmingBooking] = useState(false);
  
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPickupDateTime = searchParams.get("pickupDateTime")
    ? new Date(searchParams.get("pickupDateTime"))
    : null;
  const initialDropoffDateTime = searchParams.get("dropoffDateTime")
    ? new Date(searchParams.get("dropoffDateTime"))
    : null;
  const [pickupDateTime, setPickupDateTime] = useState(initialPickupDateTime);
  const [dropoffDateTime, setDropoffDateTime] = useState(initialDropoffDateTime);

  const handleMinDropOffTime = (time) => {
    if (!pickupDateTime) return filterTime(time);
    const pickUpTime = new Date(pickupDateTime);
    pickUpTime.setHours(pickUpTime.getHours() + 12);
    return time.getTime() >= pickUpTime.getTime();
  };

  const now = new Date();
  const minPickupDateTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  const filterTime = (time) => time.getTime() >= minPickupDateTime.getTime();

  const fetchData = async () => {
    try {
      const url = `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars?pickupDateTime=${encodeURIComponent(
        pickupDateTime.toISOString()
      )}&dropoffDateTime=${encodeURIComponent(
        dropoffDateTime.toISOString()
      )}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const sortByPrice = (cars) =>
        cars.sort((a, b) => {
          const priceA = parseFloat(a.Price.replace(/[^0-9.-]+/g, ""));
          const priceB = parseFloat(b.Price.replace(/[^0-9.-]+/g, ""));
          return priceA - priceB;
        });
      const filteredData = data.filter(
        (car) => car.Seating === "5 Seater" || car.Seating === "7 Seater"
      );
      const sortedData = sortByPrice(filteredData);
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pickupDateTime && dropoffDateTime) {
      fetchData();
    }
  }, [pickupDateTime, dropoffDateTime]);

  const handleBookCar = (car) => {
    if (!pickupDateTime || !dropoffDateTime) {
      alert("Please select both pickup and drop-off dates");
      return;
    }
    if (car.Availability !== "Available") {
      alert("This car is not available for booking");
      return;
    }
    const hours = Math.ceil((dropoffDateTime - pickupDateTime) / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const carPricePerDay = parseFloat(car.Price.replace(/[^\d.-]/g, ""));
    const carPricePerHour = carPricePerDay / 24;
    let totalPrice = Math.round(carPricePerDay * days + carPricePerHour * remainingHours);
    let discountAmount = 0;
    if (days === 0 && remainingHours < 24) {
      totalPrice *= 1.4;
    }
    if (days >= 10) {
      discountAmount = Math.round(totalPrice * 0.1);
      totalPrice *= 0.9;
    } else if (days >= 4) {
      discountAmount = Math.round(totalPrice * 0.05);
      totalPrice *= 0.95;
    }
    setSelectedCar(car);
    setPrice(totalPrice);
    setDiscount(discountAmount);
    setShowConfirmation(true);
  };

  const confirmBooking = async () => {
    if (!isSignedIn) {
      const redirectUrl = `/sign-in?from=${encodeURIComponent(
        "/SearchCars"
      )}&pickupDateTime=${pickupDateTime.toISOString()}&dropoffDateTime=${dropoffDateTime.toISOString()}`;
      router.push(redirectUrl);
      return;
    }
    if (confirmingBooking) return;
    setConfirmingBooking(true);
    try {
      const roundedPrice = Math.round(price);
      const docStatusResponse = await fetch(
        `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/users/${user.id}/documents/status`
      );
      if (!docStatusResponse.ok) {
        throw new Error("Failed to fetch document status");
      }
      const docStatusData = await docStatusResponse.json();
      if (docStatusData.status === "verified") {
        const orderResponse = await fetch(
          "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: roundedPrice, currency: "INR" }),
          }
        );
        if (!orderResponse.ok) {
          const errorDetails = await orderResponse.json();
          throw new Error(`Failed to create order: ${errorDetails.message}`);
        }
        const orderData = await orderResponse.json();
        const orderId = orderData.orderId;
        router.push(
          `/payment?orderId=${orderId}&amount=${roundedPrice}&carId=${selectedCar.G7cars123}&pickupDateTime=${pickupDateTime.toISOString()}&dropoffDateTime=${dropoffDateTime.toISOString()}&discount=${discount}`
        );
      } else if (docStatusData.status === "pending") {
        alert("Your documents are under verification. We will notify you once verified.");
      } else {
        alert("Please upload and verify your documents before confirming your booking.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("An error occurred while processing your booking. Please try again.");
    } finally {
      setConfirmingBooking(false);
    }
  };

  const cancelConfirmation = () => {
    setShowConfirmation(false);
    setSelectedCar(null);
    setPrice(0);
    setDiscount(0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex justify-center m-10 text-4xl font-bold underline text-rose-900">Cars List</div>
      <div className="flex justify-center my-10">
        <div>
          <DatePicker
            selected={pickupDateTime}
            onChange={(date) => { setPickupDateTime(date); setLoading(true); }}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="dd MMMM yyyy, h:mm aa"
            className="bg-rose-950/50 lg:w-96 md:w-80 w-24 text-white lg:text-lg md:text-md text-sm lg:h-24 lg:p-4 md:p-4 p-2 outline-none rounded-l-xl flex text-center cursor-pointer"
            filterTime={filterTime}
          />
        </div>
        <div>
          <DatePicker
            selected={dropoffDateTime}
            onChange={(date) => { setDropoffDateTime(date); setLoading(true); }}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="dd MMMM yyyy, h:mm aa"
            className="bg-rose-950/50 lg:w-96 md:w-80 w-24 text-white lg:text-lg md:text-md text-sm lg:h-24 lg:p-4 md:p-4 p-2 outline-none rounded-r-xl flex text-center cursor-pointer"
            filterTime={handleMinDropOffTime}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-24 my-10">
          {data.map((car, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-center">
                <img src={car.ImageUrl} alt={car.Model} className="w-full h-auto rounded-lg" />
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-center">{car.Model}</h2>
                <p className="text-center text-gray-700">{car.FuelType}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-800">{car.Price}</span>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => handleBookCar(car)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirm Booking</h3>
              <button onClick={cancelConfirmation}>
                <IoIosClose size={24} />
              </button>
            </div>
            <p className="mb-4">Are you sure you want to book this car?</p>
            <p className="mb-4">Price: ₹{price}</p>
            <p className="mb-4">Discount: ₹{discount}</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mr-2"
                onClick={cancelConfirmation}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={confirmBooking}
                disabled={confirmingBooking}
              >
                {confirmingBooking ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Page;
