"use client";
import Link from "next/link";
import { FaHome, FaArrowLeft, FaBookReader } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center bg-background">
      <div
        className="flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider rounded-full border shadow-sm"
        style={{
          backgroundColor: "rgba(255, 0, 24, 0.08)",
          color: "#ff0018",
          borderColor: "rgba(255, 0, 24, 0.2)",
        }}
      >
        <FaBookReader className="w-3.5 h-3.5 animate-bounce" />
        <span>A Misplaced Manuscript • BookNook</span>
      </div>

      {/* 404 Heading */}
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground/90">
        4<span style={{ color: "#ff0018" }}>0</span>4
      </h1>

      <div className="mt-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          This Chapter Has Drifted from the Shelves
        </h2>
      </div>

      <p className="max-w-md mt-3 text-sm md:text-base text-neutral-500 leading-relaxed">
        The page you seek has wandered beyond the library&apos;s catalog—perhaps quietly retired,
        rebound under another title, or lost to the gentle passage of time.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full max-w-xs sm:max-w-none justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 shadow-lg active:scale-95 cursor-pointer"
          style={{
            backgroundColor: "#ff0018",
            boxShadow: "0 10px 25px -5px rgba(255, 0, 24, 0.3)",
          }}
        >
          <FaHome className="w-4 h-4" />
          <span>Return to the Hearth</span>
        </Link>

        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-all duration-200 border border-neutral-200 active:scale-95 cursor-pointer"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Turn Back a Page</span>
        </button>
      </div>
    </div>
  );
}
