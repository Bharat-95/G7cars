"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 60000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      Payment Failed, please try again.....
    </div>
  );
}

export default Page;
