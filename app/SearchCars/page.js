"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";
import { TbManualGearboxFilled } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import Image from "next/image";

const Page = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [price, setPrice] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const pickupDateTime = new Date(searchParams.get("pickupDateTime"));
    const dropoffDateTime = new Date(searchParams.get("dropoffDateTime"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://pvmpxgfe77.execute-api.us-east-1.amazonaws.com/cars"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleBookCar = (car) => {
        if (!pickupDateTime || !dropoffDateTime) {
            alert("Please select pickup/drop-off dates");
            return;
        }

        const pickupDate = new Date(pickupDateTime);
        const dropoffDate = new Date(dropoffDateTime);
        const days = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
        const totalPrice = car.Price * days;
        setSelectedCar(car);
        setPrice(totalPrice);
        setShowConfirmation(true);
    };

    const confirmBooking = () => {
        router.push("/payment");
    };

    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <div className="flex justify-center m-10 text-4xl font-bold underline text-rose-900">
                Cars List
            </div>
            <div className="lg:grid lg:grid-cols-4 md:grid md:grid-cols-2">
                {data.map((car) => (
                    <div key={car.G7cars123} className="m-20 cursor-pointer">
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
                                className="flex justify-center py-4 px-2 bg-rose-900 text-white rounded-md hover:bg-rose-900/95 w-52"
                            >
                                Rent car
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirmation && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-xl">
                        <h2 className="text-2xl font-semibold text-rose-900">
                            Confirmation
                        </h2>
                        <div>
                            <p>
                                <strong>Car:</strong> {selectedCar.Name}
                            </p>
                            <p>
                                <strong>Pick-up Date & Time:</strong>{" "}
                                {pickupDateTime.toString()}
                            </p>
                            <p>
                                <strong>Drop-off Date & Time:</strong>{" "}
                                {dropoffDateTime.toString()}
                            </p>
                            <p>
                                <strong>Total Price:</strong> ${price}
                            </p>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={confirmBooking}
                                className="px-4 py-2 bg-rose-900 text-white rounded-md hover:bg-rose-900/95"
                            >
                                Confirm Booking
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
