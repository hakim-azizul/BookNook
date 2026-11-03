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
      <div className="bg-white dark:bg-[#18181b] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-neutral-100 dark:border-neutral-800 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-100 dark:border-red-900/50">
            <HiOutlineExclamationTriangle className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            aria-label="Close retirement dialog"
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Retire Volume from Circulation
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Are you certain you wish to withdraw{" "}
            {bookTitle ? (
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                &ldquo;{bookTitle}&rdquo;
              </span>
            ) : (
              "this volume"
            )}{" "}
            from the communal shelves? This action permanently closes its chapter in our library catalog.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
          >
            Keep in Circulation
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#ff5b49] hover:bg-[#ff0018] transition-colors shadow-sm shadow-[#ff5b49]/30 cursor-pointer disabled:opacity-50"
          >
            {isDeleting ? "Retiring..." : "Yes, Withdraw Volume"}
          </button>
        </div>
      </div>
    </div>
  );
}
