import React from "react";
import Image from "next/image";
import iBook from "@/types/bookType";
import Link from "next/link";

interface BookCardProps {
  book: iBook;
}

const BookCard = ({ book }: BookCardProps) => {
  const fallbackImage =
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400";

  return (
    <div className="group relative flex flex-col w-full max-w-xs sm:max-w-65 rounded-3xl bg-[#121212] border border-neutral-800/80 hover:border-[#ff5b49]/50 transition-all duration-300 shadow-xl overflow-hidden hover:shadow-[#ff0018]/10">
      {/* Top Cover Image Section */}
      <div className="relative w-full h-52 overflow-hidden bg-neutral-900">
        <Image
          src={book.image || fallbackImage}
          alt={book.title || "Book Cover"}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-black/30" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-white bg-[#ff5b49]/90 backdrop-blur-md rounded-lg shadow-md">
          {book.category || "General"}
        </span>
      </div>

      {/* Book Info Section */}
      <div className="flex flex-col justify-between grow p-5">
        <div>
          <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-[#ff5b49] transition-colors">
            {book.title}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
            By{" "}
            <span className="text-neutral-200 font-medium">
              {book.author || "Unknown"}
            </span>
          </p>
        </div>

        {/* Bottom View Details Link */}
        <div className="flex items-center justify-end mt-4 pt-3 border-t border-neutral-800/80">
          <Link href={`/books/${book._id}`}>
            <span className="text-xs font-semibold text-[#ff0018] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 cursor-pointer">
              View Details &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
