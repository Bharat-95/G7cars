"use client"
import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../../../app/globals.css';

export default function Page() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const redirectUrl = router.query.redirectUrl ? decodeURIComponent(router.query.redirectUrl) : '/';

  useEffect(() => {
    if (isSignedIn) {
      router.push(redirectUrl);
    }
  }, [isSignedIn, redirectUrl, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
