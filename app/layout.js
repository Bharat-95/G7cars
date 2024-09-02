import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "G7Cars",
  description: "",
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <ClerkProvider>
      <link rel="icon" href="../public/favicon.ico" />
      <html lang="en" className="bg-rose-950 w-screen">
        <body className={inter.className}>
          {isHomePage ? (
            children
          ) : (
            <>
              <SignedIn>{children}</SignedIn>
              <SignedOut>
                <p>You must be signed in to view this content.</p>
              </SignedOut>
            </>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
