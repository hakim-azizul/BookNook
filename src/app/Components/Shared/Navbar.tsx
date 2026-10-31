"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/"},
    { name: "All Books", path: "/books"},
    { name: "Add Book", path: "/add-book"},
    { name: "MY Books", path: "/my-books"},
    { name: "MY Borrows", path: "/my-borrows"},
  ];
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* লোগো সেকশন */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-[#ff5b49] text-3xl">
                <Image src='/BookNook.png' width={35} height={0} alt='logo' ></Image>
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                BookNook
              </span>
            </Link>
          </div>

          {/* ডেস্কটপ নেভ লিংকস (অ্যাক্টিভ রাউট কালার চেঞ্জ সহ) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-base font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#ff0018]"
                      : "text-gray-800 hover:text-[#ff0018]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          {/* right buttons*/}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:text-[#ff1b49] border border-b-accent-soft hover:border-[#ff1b49] transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-lg font-medium text-white hover:text-[#ff5b49]  bg-[#ff5b49] hover:bg-[#1a1a1a] shadow-md shadow-red-100 transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* মোবাইল মেনু টগল বাটন */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-700 hover:text-[#ff0018] focus:outline-none"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-base font-medium rounded-md px-3 ${
                  isActive
                    ? "text-[#ff0018] bg-red-50"
                    : "text-gray-700 hover:text-[#ff0018] hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-lg font-medium text-white bg-[#ff0018] hover:bg-[#ff0018]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
