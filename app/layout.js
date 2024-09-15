import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head"; // Import Head for metadata and favicon
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "G7Cars",
  description: "Your go-to car rental service",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {/* Head for metadata and favicon */}
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics Tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0GEHKTG50P"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0GEHKTG50P');
            `,
          }}
        />
      </Head>
      <html lang="en">
        <body className={`${inter.className} bg-rose-950 lg:w-screen md:w-screen sm:w-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
