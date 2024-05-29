import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "G7Cars",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>   
      <link rel="icon" href="../public/favicon.ico" />
       <html lang="en" className="bg-rose-950 w-screen">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>

  );
}