"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineBookOpen, HiPlus } from "react-icons/hi2";

export default function MyBooksEmptyState() {
  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200 text-center space-y-4 shadow-sm">
      <div className="w-16 h-16 bg-[#ff5b49]/10 text-[#ff5b49] rounded-2xl flex items-center justify-center mx-auto">
        <HiOutlineBookOpen className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-neutral-800">
        Your Personal Archives are Quiet
      </h3>
      <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
        You have not yet cataloged any volumes on the communal shelves. Bestow your first book and ignite curiosity in another reader&apos;s journey.
      </p>
      <div className="pt-2">
        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-md shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm cursor-pointer"
        >
          <HiPlus className="w-4 h-4" />
          <span>Bestow Your First Volume</span>
        </Link>
      </div>
    </div>
  );
}
