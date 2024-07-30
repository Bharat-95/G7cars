"use client"
import React from "react";
import Logo from "../public/1.png";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


const Header = () => {


   

  return (
    <div className="lg:py-6 py-2 md:py-4 lg:px-20 md:px-10 px-6 flex items-center justify-between text-white bg-black w-screen">
      <Link href='/'>
        <Image src={Logo} alt="No Logo Found" className="lg:w-40 md:w-20 lg:h-20 md:h-10 h-4 w-6" />
      </Link>
      <div>
        <ul className="flex lg:space-x-20 md:space-x-10 space-x-4 lg:text-lg text-[10px]">
          <Link href="/"><li className="hover:text-rose-200 ">Home</li></Link>
          <Link href="/about"><li className="hover:text-rose-200">About Us</li></Link>
          <SignedIn>
          <Link href='/bookings' className=" hover:text-rose-200">My Bookings</Link>
          </SignedIn>
        </ul>
      </div>
      <Link href="/contact" className="hover:opacity-90 bg-rose-900  h-12 w-40 lg:flex md:flex justify-center items-center hidden  rounded-2xl shadow-md" target="_blank">Attach Your Car</Link>
      <div className="flex justify-center">
      <SignedOut>
      <Link href='sign-in' className="hover:opacity-90 bg-rose-900 lg:h-12 lg:w-40 h-8 w-20 md:h-12 md:w-32 flex justify-center items-center lg:rounded-2xl md:rounded-xl rounded-lg shadow-md">Sign In </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </div>
  );
};

export default Header;
