"use client"
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import '../../../app/globals.css';

export default function Page() {
  const router = useRouter();
  const { redirectUrl } = router.query;

  const handleOnSignIn = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn afterSignIn={handleOnSignIn} />
    </div>
  );
}
