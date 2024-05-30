"use client"
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import '../../../app/globals.css';

export default function Page() {
  const router = useRouter();
  const redirectUrl = router.query?.redirectUrl || '/';

  const handleOnSignIn = () => {
    router.push(redirectUrl);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn afterSignInUrl={redirectUrl} />
    </div>
  );
}
