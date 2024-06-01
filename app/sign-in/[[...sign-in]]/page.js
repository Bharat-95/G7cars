"use client"
import { SignIn } from "@clerk/nextjs";
import '../../../app/globals.css'
import { useRouter } from "next/navigation";



export default function Page() {

  const router = useRouter();
  const { from } = router.query;

  return <div className="flex justify-center items-center h-screen"><SignIn forceRedirectUrl={from || '/'} /></div>
}

