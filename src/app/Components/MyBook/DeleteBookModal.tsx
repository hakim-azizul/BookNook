"use client";
import React from "react";
import { HiOutlineExclamationTriangle, HiXMark } from "react-icons/hi2";

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle?: string;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export default function DeleteBookModal({
  isOpen,
  onClose,
  bookTitle,
  onConfirm,
  isDeleting,
}: DeleteBookModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-neutral-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
            <HiOutlineExclamationTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close delete dialog"
            className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-neutral-900">
            Delete Book Confirmation
          </h3>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Are you sure you want to delete{" "}
            {bookTitle ? (
              <span className="font-semibold text-neutral-800">
                &ldquo;{bookTitle}&rdquo;
              </span>
            ) : (
              "this book"
            )}{" "}
            from the library? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#ff5b49] hover:bg-[#ff0018] transition-colors shadow-sm shadow-[#ff5b49]/30 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
