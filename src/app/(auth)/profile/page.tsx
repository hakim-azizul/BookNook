"use client";
import React from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineShieldCheck,
  HiOutlineBookOpen,
  HiOutlineBookmark,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { FiMail, FiLogOut } from "react-icons/fi";
import { toast } from "@heroui/react";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
    toast.success("Successfully signed out. May your literary journey continue!");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0f10] py-10 px-4 flex justify-center items-start transition-colors duration-200">
        <div className="max-w-4xl w-full space-y-6">
          <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm animate-pulse">
            <div className="h-40 bg-neutral-200 dark:bg-neutral-700 relative">
              <div className="absolute top-4 right-4 h-7 w-36 bg-neutral-300 dark:bg-neutral-600 rounded-full" />
            </div>
            <div className="px-8 pb-8 pt-0 relative">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 -mt-16 mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#18181b] bg-neutral-300 dark:bg-neutral-700 shadow-md" />
                <div className="h-10 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-xl" />
              </div>
              <div className="space-y-3">
                <div className="h-8 w-48 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="h-4 w-44 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                  <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#18181b] p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-neutral-300 dark:bg-neutral-600 rounded-md" />
                  <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                </div>
              </div>
              <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
            </div>
            <div className="bg-white dark:bg-[#18181b] p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-neutral-300 dark:bg-neutral-600 rounded-md" />
                  <div className="h-3 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                </div>
              </div>
              <div className="h-4 w-4 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-neutral-50 dark:bg-[#0f0f10] flex flex-col justify-center items-center px-4 transition-colors duration-200">
        <div className="bg-white dark:bg-[#18181b] p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl text-center max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            A Reader&apos;s Hearth Awaits
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Please sign in to access your personal reading sanctuary and curated archives.
          </p>
          <Link
            href="/signin?callbackUrl=/profile"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm cursor-pointer"
          >
            Enter the Sanctuary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 dark:from-[#0f0f10] dark:via-[#141416] dark:to-[#0f0f10] py-10 sm:py-12 px-4 sm:px-8 text-[#121212] dark:text-neutral-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm overflow-hidden">
          {/* Top Decorative Banner */}
          <div className="h-32 sm:h-40 bg-linear-to-r from-[#ff5b49] to-[#ff0018] relative">
            <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-md">
              <HiOutlineSparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <span>Bibliophile Guild Member</span>
            </span>
          </div>

          {/* Profile Info Section */}
          <div className="relative px-6 sm:px-8 pb-8 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              {/* Profile Image */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-[#18181b] shadow-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0">
                <Image
                  src={
                    user.image ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
                  }
                  alt={user.name || "Reader Avatar"}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl">
                  Active Reader
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#ff0018] bg-[#ff0018]/10 hover:bg-[#ff0018]/20 border border-[#ff0018]/20 rounded-xl transition-colors cursor-pointer"
                >
                  <FiLogOut className="w-3.5 h-3.5" />
                  <span>Depart Sanctuary</span>
                </button>
              </div>
            </div>

            {/* Name & Email Details */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs text-neutral-400 font-medium italic">
                Reader &amp; Contributor to the Commonwealth of Letters
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <FiMail className="w-4 h-4 text-[#ff5b49]" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineShieldCheck className="w-4 h-4 text-[#ff5b49]" />
                  Verified Bibliophile
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity & Navigation Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/my-books"
            className="group p-6 bg-white dark:bg-[#18181b] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-[#ff5b49]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ff5b49]/10 flex items-center justify-center text-[#ff5b49]">
                <HiOutlineBookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-[#ff5b49] transition-colors">
                  My Curated Archives
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Volumes you have bequeathed to the communal shelves
                </p>
              </div>
            </div>
            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </Link>

          <Link
            href="/my-borrows"
            className="group p-6 bg-white dark:bg-[#18181b] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-[#ff5b49]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ff5b49]/10 flex items-center justify-center text-[#ff5b49]">
                <HiOutlineBookmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white group-hover:text-[#ff5b49] transition-colors">
                  My Reading Desk
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Volumes currently keeping you company
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
