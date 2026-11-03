import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";
import { ToastProvider } from "@heroui/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BookNook | Digital Community Library",
    template: "%s | BookNook",
  },
  description:
    "Read continuously, Share insights, Grow community. Explore, borrow, and contribute books in our modern digital community library.",
  keywords: [
    "BookNook",
    "Digital Library",
    "Borrow Books",
    "Book Sharing",
    "Reading Community",
    "Bookshelf",
  ],
  authors: [{ name: "BookNook Community" }],
  openGraph: {
    title: "BookNook | Digital Community Library",
    description:
      "Your digital space to borrow, share, and discover amazing books. Connect with fellow readers and expand your knowledge.",
    siteName: "BookNook",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Global Toast Provider */}
        <ToastProvider placement="top end" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
