"use client"
import { SignIn } from "@clerk/nextjs";
import '../../../app/globals.css'
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const pickupDateTime = searchParams.get('pickupDateTime') ? new Date(searchParams.get('pickupDateTime')) : null;
const dropoffDateTime = searchParams.get('dropoffDateTime') ? new Date(searchParams.get('dropoffDateTime')) : null;

export default function Page() {
  return <div className="flex justify-center items-center h-screen"><SignIn forceRedirectUrl="/SearchCars?pickupDateTime=${encodeURIComponent(pickupISOString)}&dropoffDateTime=${encodeURIComponent(dropoffISOString)" /></div>
}

