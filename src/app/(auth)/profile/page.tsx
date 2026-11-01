"use client";
import React from "react";
import { useSession } from "@/lib/auth-client"; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক রাখুন
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineShieldCheck,
  HiOutlineBookOpen,
  HiOutlineBookmark,
  HiOutlinePencilSquare,
    HiOutlineSparkles,
} from "react-icons/hi2";
import { FiMail } from "react-icons/fi";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#ff5b49] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-neutral-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            Access Denied
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            Please sign in to view your profile page.
          </p>
          <Link
            href="/signin"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 py-12 px-4 sm:px-8 text-[#121212]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="h-32 sm:h-40 bg-linear-to-r from-[#ff5b49] to-[#ff0018] relative">
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md">
              <HiOutlineSparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <span>BookNook Member</span>
            </span>
          </div>

          {/* Profile Info Section */}
          <div className="relative px-6 sm:px-8 pb-8 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              {/* Profile Image */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl bg-neutral-100 overflow-hidden shrink-0">
                <Image
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
                  }
                  alt={user.name || "User Avatar"}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("Edit profile feature coming soon!")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors border border-neutral-200"
                >
                  <HiOutlinePencilSquare className="w-4 h-4 text-neutral-600" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Name & Email Details */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <FiMail className="w-4 h-4 text-[#ff5b49]" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineShieldCheck className="w-4 h-4 text-[#ff5b49]" />
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity & Navigation Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/my-books"
            className="group p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-[#ff5b49]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ff5b49]/10 flex items-center justify-center text-[#ff5b49]">
                <HiOutlineBookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 group-hover:text-[#ff5b49] transition-colors">
                  My Contributed Books
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage all books you added
                </p>
              </div>
            </div>
            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>

          <Link
            href="/my-borrows"
            className="group p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-sm hover:shadow-md hover:border-[#ff5b49]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ff5b49]/10 flex items-center justify-center text-[#ff5b49]">
                <HiOutlineBookmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 group-hover:text-[#ff5b49] transition-colors">
                  My Borrowed Books
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Track your reading shelf
                </p>
              </div>
            </div>
            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
