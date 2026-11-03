"use client";
import React from "react";

export default function MyBooksSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-8 flex justify-center">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-6">
          <div className="space-y-2">
            <div className="h-8 w-56 bg-neutral-300 rounded-lg animate-pulse" />
            <div className="h-4 w-72 bg-neutral-200 rounded-md animate-pulse" />
          </div>
          <div className="h-7 w-24 bg-neutral-200 rounded-full animate-pulse" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-20 h-24 sm:w-24 sm:h-32 bg-neutral-200 rounded-2xl shrink-0" />
                <div className="space-y-2.5 flex-1">
                  <div className="h-5 w-20 bg-neutral-200 rounded-full" />
                  <div className="h-6 w-48 bg-neutral-300 rounded-lg" />
                  <div className="h-4 w-32 bg-neutral-200 rounded-md" />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                <div className="h-9 w-20 bg-neutral-200 rounded-xl" />
                <div className="h-9 w-20 bg-neutral-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
