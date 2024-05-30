"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Bg from '../public/bg_1.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

const Banner = () => {
    const [pickupDateTime, setPickupDateTime] = useState(null);
    const [dropoffDateTime, setDropoffDateTime] = useState(null);
    const router = useRouter();



    const handleBooking = () => {
        if (pickupDateTime && dropoffDateTime) {
            router.push('/SearchCars', { 
                query: {
                    pickupDateTime: pickupDateTime.toString(),
                    dropoffDateTime: dropoffDateTime.toString(),
                },
            });
        } else {
            alert("Please select PickUp and Drop Dates")
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
        <div className='text-white bg-rose-900 w-screen'>
            <Image src={Bg} alt='No Image Found' className='W-screen lg:h-[800px] md:h-[600px] opacity-70 ' />
            <div className='absolute lg:top-[30%] md:top-[20%] top-[10%] lg:left-[8%] md:left-[4%] lg:space-y-10 md:space-y-4 space-y-4'>
                <div className='flex lg:w-[60%] md:w-[80%] lg:mx-56 md:mx-20 leading-relaxed lg:text-4xl md:text-2xl text-lg font-extrabold text-center '> Fast & Easy Way To Rent A Car in Hyderabad Price starting from 69/hr</div>
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
                            placeholderText="Pick-up"
                            className='bg-rose-950 lg:w-96 md:w-80 w-24 lg:text-lg md:text-md text-sm lg:h-24 lg:p-4 md:p-4 p-2 opacity-80 outline-none rounded-l-xl flex text-center cursor-pointer'
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
                            placeholderText="Drop-off"
                            className='bg-rose-950 lg:w-96 md:w-80 w-24 lg:text-lg md:text-md text-sm lg:h-24 lg:p-4 md:p-4 p-1 opacity-80 outline-none flex text-center rounded-r-xl cursor-pointer'
                            minDate={pickupDateTime || minPickupDateTime}
                            filterTime={handleMinDropOffTime}
                        />
                    </div>
                </div>
    
                <div className='flex justify-center'>
                    <button onClick={handleBooking} className='flex justify-center items-center mx-10 bg-rose-950 opacity-80 w-40 h-10 rounded-xl'>Book Now</button>
                </div>
                
            </div>
        </div>
    );
};

export default Banner;