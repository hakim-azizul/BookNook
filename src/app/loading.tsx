import React from "react";
import { FaBookReader } from "react-icons/fa";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="p-4 rounded-full shadow-lg animate-bounce"
          style={{
            backgroundColor: "rgba(255, 0, 24, 0.1)",
            color: "#ff0018",
          }}
        >
          <FaBookReader className="w-8 h-8 animate-pulse" />
        </div>

        {/* Spinner */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-10 h-10 border-4 border-dashed rounded-full animate-spin"
            style={{
              borderColor: "#ff0018",
              borderTopColor: "transparent",
            }}
          ></div>
        </div>
        <p className="text-xs font-semibold text-neutral-500 tracking-widest uppercase animate-pulse">
          Opening the Archives...
        </p>
      </div>
    </div>
  );
}
