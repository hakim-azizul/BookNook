"use client";
import React from "react";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";

interface MyBooksHeaderProps {
  count: number;
}

export default function MyBooksHeader({ count }: MyBooksHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          My Curated Archives
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Volumes you have generously cataloged and shared with fellow bibliophiles.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
          {count} {count === 1 ? "Volume Cataloged" : "Volumes Cataloged"}
        </span>

        <Link
          href="/add-book"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] rounded-xl shadow-sm shadow-[#ff5b49]/25 hover:opacity-95 transition-all cursor-pointer"
        >
          <HiPlus className="w-3.5 h-3.5" />
          <span>Bestow Volume</span>
        </Link>
      </div>
    </div>
  );
}
