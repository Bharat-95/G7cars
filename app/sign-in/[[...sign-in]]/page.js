import { SignIn } from "@clerk/nextjs";
import '../../../app/globals.css';

const Page = () => {
  
    const pickupISOString = pickupDateTime.toISOString();
    const dropoffISOString = dropoffDateTime.toISOString();

    const redirectUrl = `/SearchCars/pickupDateTime=${encodeURIComponent(pickupISOString)}&dropoffDateTime=${encodeURIComponent(dropoffISOString)}`;

    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn forceRedirectUrl={redirectUrl} />
        </div>
    );
}

export default Page;
