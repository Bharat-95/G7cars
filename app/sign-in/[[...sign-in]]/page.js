"use client"
import { SignIn } from "@clerk/nextjs";
import '../../../app/globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { redirectUrl, pickupDateTime, dropoffDateTime } = router.query;

  useEffect(() => {
    // If the user is already signed in, redirect them to the appropriate URL
    if (router.isReady && redirectUrl) {
      const newUrl = `${redirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`;
      router.push(newUrl);
    }
  }, [router.isReady, redirectUrl, pickupDateTime, dropoffDateTime]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        afterSignInUrl={
          redirectUrl 
            ? `${redirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`
            : '/'
        }
      />
    </div>
  );
}
