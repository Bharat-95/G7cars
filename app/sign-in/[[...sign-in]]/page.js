"use client"
import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../../../app/globals.css';

export default function Page() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const forceRedirectUrl = router.query?.redirectUrl ? decodeURIComponent(router.query.redirectUrl) : '/';
  
  useEffect(() => {
    console.log("Fallback Redirect URL:", fallbackRedirectUrl);
    console.log("isSignedIn:", isSignedIn);
    if (isSignedIn) {
      console.log("Redirecting to:", fallbackRedirectUrl);
      router.push(fallbackRedirectUrl);
    }
  }, [isSignedIn, forceRedirectUrl, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn forceRedirectUrl={forceRedirectUrl} />
    </div>
  );
}
