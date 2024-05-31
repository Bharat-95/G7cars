"use client"
import { SignIn, useUser } from "@clerk/nextjs";
import '../../../app/globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { pickupDateTime, dropoffDateTime } = router.query;

  const redirectUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL || '/search-cars';
  const fallbackRedirectUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || '/search-cars';

  useEffect(() => {
    if (isSignedIn) {
      const newUrl = `${redirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`;
      router.push(newUrl);
    }
  }, [isSignedIn, redirectUrl, pickupDateTime, dropoffDateTime, router]);

  if (isSignedIn) {
    // Return null to prevent rendering the SignIn component if the user is already signed in
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        redirectUrl={`${redirectUrl}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}`}
      />
    </div>
  );
}
