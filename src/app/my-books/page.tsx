"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { HiOutlineBookOpen } from "react-icons/hi2";
import MyBookCard from "../Components/MyBook/MyBookCard";
import iBook from "@/types/bookType";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MyBooksPage = () => {
  const { data: session, isPending } = useSession();
  const [myBooks, setMyBooks] = useState<iBook[]>([]);

  useEffect(() => {
    if (isPending || !session?.user?.email) return;
    fetch(`${API_URL}/books/user/${encodeURIComponent(session.user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching my books:", err);
      });
  }, [session, isPending]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-neutral-50 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#ff5b49] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 py-12 px-4 sm:px-8 text-[#121212]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              My Added Books
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Manage all the books you have contributed to the library.
            </p>
          </div>
          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
            {myBooks.length} Books
          </span>
        </div>

        {/* List / Empty State */}
        {myBooks.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-neutral-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-[#ff5b49]/10 text-[#ff5b49] rounded-2xl flex items-center justify-center mx-auto">
              <HiOutlineBookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800">
              No books added yet
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              You have not contributed any books to the platform yet. Start
              adding books now!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {myBooks.map((book) => (
              <MyBookCard
                key={book._id}
                book={book}
                />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
