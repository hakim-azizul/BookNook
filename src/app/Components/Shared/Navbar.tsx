"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { FaUser, FaRightFromBracket } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Books", path: "/books" },
    { name: "Add Book", path: "/add-book" },
    { name: "MY Books", path: "/my-books" },
    { name: "MY Borrows", path: "/my-borrows" },
  ];

  return (
    <nav className="bg-white border-b border-neutral-100 sticky top-0 z-50 text-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-[#ff5b49] text-3xl">
                <Image src="/BookNook.png" width={35} height={35} alt="logo" />
              </div>
              <span className="text-2xl font-bold text-[#121212] tracking-tight">
                Book<span className="text-[#ff0018]">Nook</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-base font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#ff5b49]"
                      : "text-[#121212] hover:text-[#ff5b49]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop User Menu / Sign In Button */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <div className="relative" ref={profileRef}>
                {/* Circular Profile Image Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center focus:outline-none ring-2 ring-[#ff5b49]/60 hover:ring-[#ff0018] rounded-full transition-all"
                >
                  <Image
                    width={40}
                    height={40}
                    src={
                      user?.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                    }
                    alt={user?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                {/* Desktop Modal */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 p-4 rounded-2xl bg-[#1a1a1a] border border-neutral-800 shadow-2xl z-50 space-y-4">
                    <div className="border-b border-neutral-800 pb-3">
                      <p className="text-sm font-bold text-white truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors flex flex-row items-center gap-2"
                    >

                      <FaUser className="w-4 h-4" />

                      <span>My Profile</span>
                    </Link>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        signOut({
                          callbackURL: "/",
                        });
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-[#ff0018] hover:bg-[#ff0018]/10 rounded-xl transition-colors flex flex-row items-center gap-2"
                    >
                      <FaRightFromBracket className="w-4 h-4 text-[#ff0018]" />
                      <span className="">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-5 py-2.5 rounded-xl font-medium text-white bg-[#1a1a1a] hover:bg-neutral-800 border border-neutral-800 transition-all text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 rounded-xl font-medium text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] hover:opacity-90 shadow-lg shadow-[#ff5b49]/20 transition-all text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-neutral-300 hover:text-[#ff5b49] focus:outline-none"
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

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#121212] border-t border-neutral-800 px-4 pt-4 pb-6 space-y-4">
          {/* User is logged in, show profile card */}
          {session && (
            <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-2xl border border-neutral-800">
              <Image
                width={40}
                height={40}
                src={
                  user?.image ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
                }
                alt={user?.name || "User"}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#ff5b49]/60"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-neutral-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2.5 px-3 text-base font-medium rounded-xl transition-colors ${
                    isActive
                      ? "text-[#ff5b49] bg-[#1a1a1a]"
                      : "text-neutral-300 hover:text-[#ff5b49] hover:bg-neutral-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {session && (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 px-3 text-base font-medium text-neutral-300 hover:text-[#ff5b49] hover:bg-neutral-900 rounded-xl"
              >
                My Profile
              </Link>
            )}
          </div>

          {/* Mobile Action Button*/}
          <div className="pt-3 border-t border-neutral-800">
            {session ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({
                    callbackURL: "/",
                  });
                }}
                className="w-full text-left py-2.5 px-3 text-base font-semibold text-[#ff0018] bg-[#ff0018]/10 hover:bg-[#ff0018]/20 rounded-xl transition-colors flex flex-row items-center gap-2"
              >
                <FiLogOut className="w-4 h-4 text-[#ff0018]" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl font-medium text-white bg-[#1a1a1a] border border-neutral-800"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl font-medium text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
