"use client"
import { SignIn } from "@clerk/nextjs";
import '../../../app/globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { forceRedirectUrl, pickupDateTime, dropoffDateTime } = router.query || {};

  useEffect(() => {
    if (router.isReady && forceRedirectUrl) {
      const newUrl = `${forceRedirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`;
      router.push(newUrl);
    }
  }, [router.isReady, forceRedirectUrl, pickupDateTime, dropoffDateTime]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        afterSignIn={
          forceRedirectUrl 
            ? `${forceRedirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`
            : '/'
        }
      />
    </div>
  );
}
