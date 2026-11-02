import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-pulse flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-96 bg-neutral-200 rounded-2xl shrink-0" />
        <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-6 w-20 bg-neutral-200 rounded-full" />
            <div className="h-10 w-3/4 bg-neutral-300 rounded-xl" />
            <div className="h-4 w-1/3 bg-neutral-200 rounded-md" />
            <div className="h-20 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
          </div>
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <div className="flex justify-between">
              <div className="h-4 w-24 bg-neutral-200 rounded-md" />
              <div className="h-4 w-24 bg-neutral-200 rounded-md" />
            </div>
            <div className="h-12 w-full bg-neutral-300 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
