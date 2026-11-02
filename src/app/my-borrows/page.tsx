"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { HiOutlineBookmarkSlash } from "react-icons/hi2";
import BorrowCard from "../Components/BorrowBook/BorrowCard";
import Link from "next/link";

interface BorrowedBook {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  image: string;
  userEmail: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MyBorrowsPage = () => {
  const { data: session, isPending } = useSession();
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const user = session?.user;
  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API_URL}/borrow/${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        setBorrowedBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching borrows:", err);
      });
  }, [user?.email]);
  if (isPending) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4 flex justify-center">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-6">
            <div className="space-y-2">
              <div className="h-8 w-56 bg-neutral-300 rounded-lg" />
              <div className="h-4 w-72 bg-neutral-200 rounded-md" />
            </div>
            <div className="h-7 w-20 bg-neutral-200 rounded-full" />
          </div>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-4 w-full">
                <div className="w-20 h-28 bg-neutral-200 rounded-2xl shrink-0" />
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-16 bg-neutral-200 rounded-full" />
                    <div className="h-4 w-16 bg-neutral-200 rounded-md" />
                  </div>
                  <div className="h-6 w-48 bg-neutral-300 rounded-lg" />
                  <div className="h-4 w-32 bg-neutral-200 rounded-md" />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                <div className="h-9 w-20 bg-neutral-200 rounded-xl" />
                <div className="h-9 w-20 bg-red-100/60 rounded-xl" />
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-4 w-full">
                <div className="w-20 h-28 bg-neutral-200 rounded-2xl shrink-0" />
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-16 bg-neutral-200 rounded-full" />
                    <div className="h-4 w-16 bg-neutral-200 rounded-md" />
                  </div>
                  <div className="h-6 w-40 bg-neutral-300 rounded-lg" />
                  <div className="h-4 w-28 bg-neutral-200 rounded-md" />
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                <div className="h-9 w-20 bg-neutral-200 rounded-xl" />
                <div className="h-9 w-20 bg-red-100/60 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-[70vh] bg-neutral-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            Please Sign In.
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            To manage the stock of books you have borrowed.
          </p>
          <Link
            href="/signin"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }
  const handleReturnBook = async (borrowId: string) => {
    try {
      const res = await fetch(`${API_URL}/borrows/${borrowId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBorrowedBooks((prev) =>
          prev.filter((book) => book._id !== borrowId),
        );
      } else {
        console.error("Failed to return the book.");
      }
    } catch (error) {
      console.error("Return error:", error);
    }
  };

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
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              My Borrowed Books
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Manage and track all the books you have currently borrowed.
            </p>
          </div>
          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
            {borrowedBooks.length} Books
          </span>
        </div>

        {/* Books List / Empty State */}
        {borrowedBooks.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-neutral-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-[#ff5b49]/10 text-[#ff5b49] rounded-2xl flex items-center justify-center mx-auto">
              <HiOutlineBookmarkSlash className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800">
              No books borrowed yet
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              Explore our library and borrow your favorite books to read them
              anytime!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {borrowedBooks.map((item) => (
              <BorrowCard
                key={item._id}
                id={item._id}
                title={item.title}
                author={item.author}
                image={item.image}
                onReturn={handleReturnBook}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowsPage;
