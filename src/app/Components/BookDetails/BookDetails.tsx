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
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 py-8 sm:py-12 px-4 sm:px-8 text-[#121212]">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        {/* Main Details Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-4 sm:p-8 md:p-10 items-start">
          {/* Book Image Section */}
          <div className="md:col-span-5 flex justify-center bg-neutral-100/60 p-4 sm:p-6 rounded-2xl border border-neutral-200/60 relative w-full">
            <div className="relative w-full max-w-65 sm:max-w-[288px] h-72 sm:h-96 rounded-xl overflow-hidden shadow-xl border border-neutral-200">
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
              <span>{book.category || "General"}</span>
            </div>

            {/* Title & Author */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                {book.title}
              </h1>
              <p className="text-sm sm:text-base font-medium text-neutral-600 flex items-center gap-2">
                <span className="text-neutral-400">By</span>
                <span className="text-[#ff5b49] font-semibold">
                  {book.author}
                </span>
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <HiOutlineInformationCircle className="w-4 h-4 text-[#ff5b49]" />
                Description
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                {book.description || "No description provided for this book."}
              </p>
            </div>

            {/* Meta Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-neutral-100 text-sm">
              <div className="space-y-1">
                <span className="text-neutral-400 text-xs block">
                  Available Copies
                </span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                  <HiOutlineBookOpen className="w-4 h-4 text-[#ff5b49]" />
                  {book.quantity} Copies Available
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-400 text-xs block">
                  Contributed by:
                </span>
                <span className="font-bold text-neutral-900 flex items-center gap-1.5 truncate">
                  <HiOutlineUser className="w-4 h-4 text-[#ff5b49]" />
                  {book.contributorName || "Community Member"}
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
