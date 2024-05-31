"use client"
import { SignIn, useUser } from "@clerk/nextjs";
import '../../../app/globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { forceRedirectUrl, pickupDateTime, dropoffDateTime } = router.query || {};

  useEffect(() => {
    if (isSignedIn && forceRedirectUrl) {
      const newUrl = `${forceRedirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`;
      router.push(newUrl);
    }
  }, [isSignedIn, forceRedirectUrl, pickupDateTime, dropoffDateTime, router]);

  if (isSignedIn) {
    // Return null to prevent rendering the SignIn component if the user is already signed in
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        forceRedirectUrl={
          forceRedirectUrl 
            ? `${forceRedirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`
            : '/'
        }
      />
    </div>
  );
}
