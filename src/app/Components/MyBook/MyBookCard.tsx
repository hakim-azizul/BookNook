"use client";
import React from "react";
import Image from "next/image";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import iBook from "@/types/bookType";

interface MyBookCardProps {
  book: iBook;
  onEdit: (book: iBook) => void;
  onDelete: (id: string) => void;
}

export default function MyBookCard({
  book,
  onEdit,
  onDelete,
}: MyBookCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-md transition-all group">
      {/* Left: Image & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative w-20 h-24 sm:w-24 sm:h-32 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-100">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
              {book.category || "Book"}
            </span>
            <span className="text-xs text-neutral-500 font-medium">
              Qty: {book.quantity}
            </span>
          </div>
          <h3 className="font-extrabold text-neutral-900 text-base sm:text-lg line-clamp-1">
            {book.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500">
            By <span className="text-[#ff5b49] font-medium">{book.author}</span>
          </p>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="w-full sm:w-auto flex items-center gap-2 justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        <button
          onClick={() => onEdit(book)}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
        >
          <HiOutlinePencilSquare className="w-4 h-4 text-neutral-600" />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(book._id)}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
        >
          <HiOutlineTrash className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
