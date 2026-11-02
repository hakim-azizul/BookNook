import iBook from "@/types/bookType";
import React from "react";
import BookCard from "../Components/Shared/BookCard";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AllBooksPage = async () => {
  const res = await fetch(`${api}/allBooks`);
  const data = await res.json();
  const books = data;
  return (
    <div className="min-h-screen text-[#121212] px-4 sm:px-8 py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col items-center text-center space-y-3">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
            Digital Library
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff5b49] to-[#ff0018]">
              Book Collection
            </span>
          </h1>

          <p className="text-neutral-400 max-w-xl text-sm sm:text-base">
            Discover community-contributed reads, timeless classics, and modern
            favorites all in one place.
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-[#ff5b49] to-[#ff0018] rounded-full mt-2" />
        </div>
        {Array.isArray(books) && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {books.map((book: iBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#1a1a1a]/30 rounded-3xl border border-neutral-800">
            <p className="text-neutral-400 text-lg">
              No books found in the library yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
