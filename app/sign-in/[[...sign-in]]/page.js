"use client";
import { useSearchParams } from 'next/navigation';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/';
  const pickupDateTime = searchParams.get('pickupDateTime');
  const dropoffDateTime = searchParams.get('dropoffDateTime');

  const redirectUrl = pickupDateTime && dropoffDateTime 
    ? `${from}?pickupDateTime=${pickupDateTime}&dropoffDateTime=${dropoffDateTime}` 
    : from;

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn fallbackRedirectUrl={redirectUrl} />
    </div>
  );
};

export default SignInPage;
