"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const BannerContent = () => {
    const [pickupDateTime, setPickupDateTime] = useState(null);
    const [dropoffDateTime, setDropoffDateTime] = useState(null);
    const router = useRouter();

    const handleBooking = () => {
        if (pickupDateTime && dropoffDateTime) {
            const query = new URLSearchParams({
                pickupDateTime: pickupDateTime.toISOString(),
                dropoffDateTime: dropoffDateTime.toISOString()
            }).toString();
            router.push(`/SearchCars?${query}`);
        } else {
            alert("Please select Pick-Up and Drop-Off Dates");
        }
    };

    const handleLogin = () => {
        if (pickupDateTime && dropoffDateTime) {
            const query = new URLSearchParams({
                pickupDateTime: pickupDateTime.toISOString(),
                dropoffDateTime: dropoffDateTime.toISOString()
            }).toString();
            router.push(`/sign-in?${query}`);
        } else {
            alert("Please select Pick-Up and Drop-Off Dates");
        }
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

    return (
        <div className='absolute lg:top-[30%] md:top-[20%] top-[10%] lg:left-[8%] md:left-[4%] lg:space-y-10 md:space-y-4 space-y-4'>
            <div className='flex lg:w-[60%] md:w-[80%] lg:mx-56 md:mx-20 leading-relaxed lg:text-4xl md:text-2xl text-lg font-extrabold text-center'>
                Fast & Easy Way To Rent A Car in Hyderabad. Price starting from 69/hr
            </div>
            <div className="flex justify-center">
                <div className="">
                    <DatePicker
                        selected={pickupDateTime}
                        onChange={date => setPickupDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Pick-up Date"
                        className='bg-rose-950 lg:w-96 md:w-80 w-32 lg:text-lg md:text-md text-sm lg:h-36 lg:p-4 md:p-4 p-2 opacity-80 outline-none rounded-l-xl flex text-center cursor-pointer'
                        minDate={minPickupDateTime}
                        filterTime={filterTime}
                    />
                </div>
                <div className="">
                    <DatePicker
                        selected={dropoffDateTime}
                        onChange={date => setDropoffDateTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select Drop-off Date"
                        className='bg-rose-950 lg:w-96 md:w-80 w-32 lg:text-lg md:text-md text-sm lg:h-36 lg:p-4 md:p-4 p-2 opacity-80 outline-none flex text-center rounded-r-xl cursor-pointer'
                        minDate={pickupDateTime || minPickupDateTime}
                        filterTime={handleMinDropOffTime}
                    />
                </div>
            </div>
            <SignedIn>
                <div className='flex justify-center'>
                    <button onClick={handleBooking} className='flex justify-center items-center mx-10 bg-rose-950 opacity-80 w-40 h-10 rounded-xl'>Book Now</button>
                </div>
            </SignedIn>
            <SignedOut>
                <div className='flex justify-center'>
                    <button onClick={handleLogin} className='flex justify-center items-center mx-10 bg-rose-950 opacity-80 w-40 h-10 rounded-xl'>Book Now</button>
                </div>
            </SignedOut>
        </div>
    );
};

export default BannerContent;
