"use client"
import { useRouter } from 'next/navigation';
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  const router = useRouter();
  let from;

  if (router.query) {
    from = router.query.from;
  }

  return (
    <div className="flex justify-center items-center h-screen"><SignIn fallbackRedirectUrl={from || '/'} /></div>
  );
};

export default SignInPage;
