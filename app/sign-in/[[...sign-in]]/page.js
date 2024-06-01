"use client";
import { useSearchParams } from 'next/navigation';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn fallbackRedirectUrl={from || '/'} />
    </div>
  );
};

export default SignInPage;