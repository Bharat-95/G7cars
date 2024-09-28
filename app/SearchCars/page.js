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
  const [docStatusPending, setDocStatusPending] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [whatsappChecked, setWhatsappChecked] = useState(false);
  const [selectedWash, setSelectedWash] = useState(null);
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPickupDateTime = searchParams.get("pickupDateTime")
    ? new Date(searchParams.get("pickupDateTime"))
    : null;
  const initialDropoffDateTime = searchParams.get("dropoffDateTime")
    ? new Date(searchParams.get("dropoffDateTime"))
    : null;
  const [pickupDateTime, setPickupDateTime] = useState(initialPickupDateTime);
  const [dropoffDateTime, setDropoffDateTime] = useState(
    initialDropoffDateTime
  );

  const generateBookingId = () => {
    return `booking-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleMinDropOffTime = (time) => {
    if (!pickupDateTime) return filterTime(time);
  
    const pickUpTime = new Date(pickupDateTime);
    pickUpTime.setHours(pickUpTime.getHours() + 12);
  
    return time.getTime() >= pickUpTime.getTime();
  };

  const now = new Date();
  const minPickupDateTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const filterTime = (time) => {
      return time.getTime() >= minPickupDateTime.getTime();
  };

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
    fetchData();
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
    const hours = Math.ceil(
      (dropoffDateTime - pickupDateTime) / (1000 * 60 * 60)
    );
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const carPricePerDay = parseFloat(car.Price.replace(/[^\d.-]/g, ""));
    const carPricePerHour = carPricePerDay / 24;
    let totalPrice = Math.round(
      carPricePerDay * days + carPricePerHour * remainingHours
    );
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
    if (!termsChecked || !whatsappChecked || !selectedWash) {
      alert("Please accept all terms and select a wash option.");
      return;
    }
  
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
      let roundedPrice = Math.round(price);
  
      const washPrice = selectedWash === "Basic" ? 0 : selectedWash === "Premium" ? 299 : 0;
      roundedPrice += washPrice;
      
      const docStatusResponse = await fetch(
        `https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/users/${user.id}/documents/status`
      );
  
      if (!docStatusResponse.ok) {
        if (docStatusResponse.status === 404) {
          router.push(`/documents?pickupDateTime=${pickupDateTime.toISOString()}&dropoffDateTime=${dropoffDateTime.toISOString()}`);
          return;
        } else {
          const errorDetails = await docStatusResponse.text();
          throw new Error(`Failed to fetch document status: ${errorDetails}`);
        }
      }
  
      const docStatusData = await docStatusResponse.json();

      const bookingId = generateBookingId();
  
      if (docStatusData.status === 'verified') {
        const orderResponse = await fetch(
          "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: roundedPrice,
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
          `/payment?orderId=${orderId}&amount=${roundedPrice}&carId=${
            selectedCar.G7cars123
          }&pickupDateTime=${pickupDateTime.toISOString()}&dropoffDateTime=${dropoffDateTime.toISOString()}&discount=${discount}`
        );
      } else if (docStatusData.status === 'pending') {
        setDocStatusPending(true);
        const orderResponse = await fetch(
          "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: roundedPrice,
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
          `/payment?orderId=${orderId}&amount=${roundedPrice}&carId=${
            selectedCar.G7cars123
          }&pickupDateTime=${pickupDateTime.toISOString()}&dropoffDateTime=${dropoffDateTime.toISOString()}&discount=${discount}`
        );
      } else {
        alert('Please upload and verify your documents before confirming your booking.');
        router.push(`/documents?pickupDateTime=${pickupDateTime.toISOString()}&dropoffDateTime=${dropoffDateTime.toISOString()}`);
      }
  
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert(`An error occurred while processing your booking. Please try again.\nError details: ${error.message}`);
    } finally {
      setConfirmingBooking(false);
    }
  };
  const cancelConfirmation = () => {
    setShowConfirmation(false);
    setSelectedCar(null);
    setPrice(0);
    setDiscount(0);
    setTermsChecked(false);
    setWhatsappChecked(false);
    setSelectedWash(null);
  };
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {docStatusPending && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <p className="font-bold">Documents Under Verification</p>
          <p>Your documents are under verification. The status will get updated within an hour.</p>
        </div>
      )}
      
      <div className="flex justify-center m-10 text-4xl font-bold underline text-rose-900">
        Cars List
      </div>

      <div className="flex justify-center my-10">
        <div>
          <DatePicker
            selected={pickupDateTime}
            onChange={(date) => {
              setPickupDateTime(date);
              setLoading(true); 
            }}
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
            onChange={(date) => {
              setDropoffDateTime(date);
              setLoading(true); 
            }}
            showTimeSelect
            timeFormat="hh:mm aa"
            timeIntervals={15}
            dateFormat="dd MMMM yyyy, h:mm aa"
            className="bg-rose-950/50 lg:w-96 md:w-80 w-24 text-white lg:text-lg md:text-md text-sm lg:h-24 lg:p-4 md:p-4 p-2 outline-none rounded-r-xl flex text-center cursor-pointer"
            placeholderText="Change Drop Date"
            filterTime={handleMinDropOffTime}
          />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2">
        {loading ? (
          <div className="col-span-4 text-center">Loading...</div>
        ) : error ? (
          <div className="col-span-4 text-center text-red-600">{error}</div>
        ) : (
          data.map((car) => (
            <div key={car.G7cars123} className="mx-20 my-10 cursor-pointer">
              <div className="h-96 w-64 duration-500 p-4 rounded-xl hover:border-[2px] hover:border-rose-950 space-y-4">
                <div className="font-semibold text-xl text-rose-900">
                  {car.Name}
                </div>
                <div>{car.Price}/day</div>
                <div>
                  <Image
                    src={car.Coverimage[0]}
                    width={0}
                    height={0}
                    alt="No Image Found"
                    className="w-48 h-36"
                    unoptimized
                  />
                </div>
                <div className="gap-4 flex justify-evenly">
                  <div className="flex flex-col items-center">
                    <TbManualGearboxFilled
                      size={24}
                      className="text-gray-400"
                    />
                    <div className="text-[10px]">{car.Gear}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <MdOutlineAirlineSeatReclineNormal
                      size={24}
                      className="text-gray-400 space-y-4"
                    />
                    <div className="text-[10px]">{car.Seating}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <BsFillFuelPumpFill
                      size={24}
                      className="text-gray-400 space-y-4"
                    />
                    <div className="text-[10px]">{car.Fuel}</div>
                  </div>
                </div>
                <button
  onClick={() => handleBookCar(car)}
  className={`flex justify-center py-4 px-2 rounded-md w-52 ${
    car.Availability === "Available"
      ? "bg-rose-900 text-white hover:bg-rose-900/95"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`}
  disabled={car.Availability !== "Available"} 
>
  {car.Availability === "Available"
    ? "Rent car"
    : "Not available"}
</button>
              </div>
            </div>
          ))
        )}
      </div>

      {showConfirmation && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <button
        onClick={cancelConfirmation}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1"
        aria-label="Close"
      >
        <IoIosClose className="text-2xl" />
      </button>
      <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
      <p className="mb-4">
        You have selected {selectedCar.Model} for {price} INR with a discount of {discount} INR.
      </p>
      <p className="mb-4">
        Pickup Date: {pickupDateTime.toLocaleString()}
      </p>
      <p className="mb-4">
        Dropoff Date: {dropoffDateTime.toLocaleString()}
      </p>
      <p className="mb-4">
        <strong>Document Requirements:</strong>
        <ul className="list-disc list-inside">
          <li>Valid Driving License</li>
          <li>Valid Aadhar Card</li>
        </ul>
      </p>
      <div className="mb-4">
        <input
          type="checkbox"
          id="terms"
          checked={termsChecked}
          onChange={() => setTermsChecked(!termsChecked)}
          className="mr-2"
        />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
      </div>
      <div className="mb-4">
        <input
          type="checkbox"
          id="whatsapp"
          checked={whatsappChecked}
          onChange={() => setWhatsappChecked(!whatsappChecked)}
          className="mr-2"
        />
        <label htmlFor="whatsapp">I agree to receive WhatsApp notifications</label>
      </div>
      <div className="mb-4">
        <label htmlFor="wash" className="block text-gray-700">
          Select Wash Option:
        </label>
        <select
          id="wash"
          value={selectedWash}
          onChange={(e) => setSelectedWash(e.target.value)}
          className="border rounded-lg w-full p-2"
        >
          <option value="">Select an option</option>
          <option value="Basic">Basic Wash - ₹0</option>
          <option value="Premium">Premium Wash - ₹299</option>
        </select>
      </div>
      <button
        onClick={confirmBooking}
        disabled={confirmingBooking}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {confirmingBooking ? "Confirming..." : "Confirm Booking"}
      </button>
    </div>
  </div>
)}
      <Footer />
    </div>
  );
};

export default Page;