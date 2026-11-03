"use client";
import React from "react";
import Image from "next/image";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import iBook from "@/types/bookType";

interface MyBookCardProps {
  book: iBook;
  onEdit: (book: iBook) => void;
  onDelete: (id: string, title: string) => void;
}

export default function MyBookCard({
  book,
  onEdit,
  onDelete,
}: MyBookCardProps) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400";

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all group">
      {/* Left: Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
        <div className="relative w-20 h-24 sm:w-24 sm:h-32 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
          <Image
            src={book.image || fallbackImage}
            alt={book.title || "Book Cover"}
            fill
            sizes="96px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
              {book.category || "General"}
            </span>
            <span className="text-xs text-neutral-500 font-medium">
              Qty: {book.quantity}
            </span>
          </div>
          <h3 className="font-extrabold text-neutral-900 text-base sm:text-lg truncate">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 truncate">
            By <span className="text-[#ff5b49] font-medium">{book.author}</span>
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="w-full sm:w-auto flex items-center gap-2 justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        <button
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <HiOutlinePencilSquare className="w-4 h-4 text-neutral-600" />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(book._id, book.title)}
          aria-label={`Delete ${book.title}`}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
        >
          <HiOutlineTrash className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
