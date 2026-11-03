"use client";
import Link from "next/link";
import { FaHome, FaArrowLeft, FaBookReader } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center bg-background">
      <div
        className="flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider  rounded-full border shadow-sm"
        style={{
          backgroundColor: "rgba(255, 0, 24, 0.08)",
          color: "#ff0018",
          borderColor: "rgba(255, 0, 24, 0.2)",
        }}
      >
        <FaBookReader className="w-3.5 h-3.5 animate-bounce" />
        <span>Page Not Found • BookNook</span>
      </div>

      {/* 404 Heading */}
      <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-foreground/90">
        4<span style={{ color: "#ff0018" }}>0</span>4
      </h1>

      <div className="mt-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Oops! This page got lost in the library
        </h2>
      </div>

      <p className="max-w-md mt-3 text-sm md:text-base text-[#a1a1a1] leading-relaxed">
        The page you are looking for might have been removed, had its URL
        changed, or is temporarily out of circulation.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full max-w-xs sm:max-w-none justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-xl transition-all duration-200 shadow-lg active:scale-95"
          style={{
            backgroundColor: "#ff0018",
            boxShadow: "0 10px 25px -5px rgba(255, 0, 24, 0.3)",
          }}
        >
          <FaHome className="w-4 h-4" />
          Back to Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#ff0018] bg-secondary/80 hover:bg-secondary rounded-xl transition-all duration-200 border border-[#ff0018] active:scale-95"
        >
          <FaArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
