import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import NavBar from "./components/navBar";
import bento from "@/public/bento-svgrepo-com.svg"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = localFont({
  src: "../public/Fonts/NunitoSans-VariableFont.ttf",
});
export const metadata: Metadata = {
  title: "Bento Blog",
  description: "Welcome To My Little Bento World",
  icons:{
    icon:"/bento-svgrepo-com.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunitoSans.className} antialiased`}
      >
        <>
          <NavBar />
          {children}
        </>
      </body>
    </html>
  );
}
