import React from "react";
import Image from "next/image";
import {
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import iBook from "@/types/bookType";
import BorrowBtn from "./BorrowBtn";

interface BookDetailsProps {
  book: iBook;
}

const BookDetails = ({ book }: BookDetailsProps) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600";

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 dark:from-[#0f0f10] dark:via-[#141416] dark:to-[#0f0f10] py-8 sm:py-12 px-4 sm:px-8 text-[#121212] dark:text-neutral-100 transition-colors duration-200">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        {/* Main Details Card */}
        <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-neutral-200/80 dark:border-neutral-800 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 md:p-10 items-start">
          {/* Book Image Section */}
          <div className="md:col-span-5 flex justify-center bg-neutral-100/60 dark:bg-neutral-900/60 p-4 sm:p-6 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 relative w-full">
            <div className="relative w-full max-w-65 sm:max-w-[288px] h-72 sm:h-96 rounded-xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-700">
              <Image
                src={book.image || fallbackImage}
                alt={book.title || "Book Cover"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
            </div>
          </div>

          {/* Book Info Section */}
          <div className="md:col-span-7 space-y-5 sm:space-y-6">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
              <HiOutlineTag className="w-3.5 h-3.5" />
              <span>{book.category || "General Literature"}</span>
            </div>

            {/* Title & Author */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <span className="text-neutral-400 dark:text-neutral-500">Penned by</span>
                <span className="text-[#ff5b49] font-semibold">
                  {book.author}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                <HiOutlineInformationCircle className="w-4 h-4 text-[#ff5b49]" />
                Prologue &amp; Overview
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                {book.description || "No synopsis recorded for this volume."}
              </p>
            </div>

            {/* Meta Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-neutral-100 dark:border-neutral-800 text-sm">
              <div className="space-y-1">
                <span className="text-neutral-400 dark:text-neutral-500 text-xs block">
                  Circulating Copies
                </span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <HiOutlineBookOpen className="w-4 h-4 text-[#ff5b49]" />
                  {book.quantity} Copies Available
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-400 dark:text-neutral-500 text-xs block">
                  Bequeathed to Library by:
                </span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 truncate">
                  <HiOutlineUser className="w-4 h-4 text-[#ff5b49]" />
                  {book.contributorName || "Communal Benefactor"}
                </span>
              </div>
            </div>

            {/* Borrow Action Component */}
            <div className="pt-2">
              <BorrowBtn
                bookId={book._id}
                title={book.title}
                image={book.image}
                author={book.author}
                quantity={book.quantity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
