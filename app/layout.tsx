import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CardFlight",
  description:
    "Parse a transaction string into a transaction object and display the data on the webpage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 pb-1 pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] -z-10 absolute top-[-6rem] h-[31.25rem] w-[31.25rem] right-[11rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>

        <div className="bg-[#dbd7fb] -z-10 absolute top-[-1rem] h-[31.25rem] w-[50rem] left-[-35rem] rounded-full blur-[10rem] sm:w-[68.5rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
