"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { HiOutlineBookmarkSlash } from "react-icons/hi2";
import BorrowCard from "../Components/BorrowBook/BorrowCard";
import Link from "next/link";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "@heroui/react";

export interface BorrowedBook {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  image: string;
  userEmail: string;
  borrowDate?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MyBorrowsPage = () => {
  const { data: session, isPending } = useSession();
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const user = session?.user;

  useEffect(() => {
    let ignore = false;
    const userEmail = user?.email;

    if (!userEmail) {
      return;
    }

    const loadBorrows = async () => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(
          `${API_URL}/borrow/${encodeURIComponent(userEmail)}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json().catch(() => []);
        if (!ignore) {
          if (res.ok && Array.isArray(data)) {
            setBorrowedBooks(data);
          } else {
            setBorrowedBooks([]);
          }
          setIsFetching(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching borrows:", err);
          toast.danger("Could not retrieve your borrowed volumes. Please try refreshing.");
          setBorrowedBooks([]);
          setIsFetching(false);
        }
      }
    };

    loadBorrows();

    return () => {
      ignore = true;
    };
  }, [user?.email]);

  if (isPending || (user && isFetching && borrowedBooks.length === 0)) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-[#0f0f10] py-12 px-4 flex justify-center transition-colors duration-200">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="space-y-2">
              <div className="h-8 w-56 bg-neutral-300 dark:bg-neutral-700 rounded-lg animate-pulse" />
              <div className="h-4 w-72 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
            </div>
            <div className="h-7 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#18181b] p-5 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-20 h-28 bg-neutral-200 dark:bg-neutral-800 rounded-2xl shrink-0" />
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                      <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                    </div>
                    <div className="h-6 w-48 bg-neutral-300 dark:bg-neutral-700 rounded-lg" />
                    <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-neutral-800">
                  <div className="h-9 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-neutral-50 dark:bg-[#0f0f10] flex flex-col justify-center items-center px-4 transition-colors duration-200">
        <div className="bg-white dark:bg-[#18181b] p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl text-center max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            A Reader&apos;s Hearth Awaits
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Please sign in to oversee your active reading shelf and manage the volumes currently in your care.
          </p>
          <Link
            href="/signin?callbackUrl=/my-borrows"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm cursor-pointer"
          >
            Enter Sanctuary
          </Link>
        </div>
      </div>
    );
  }

  const handleReturnBook = async (borrowId: string) => {
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${API_URL}/borrows/${borrowId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setBorrowedBooks((prev) =>
          prev.filter((book) => book._id !== borrowId),
        );
        toast.success("Volume safely returned to the shelves with gratitude!");
      } else {
        toast.danger(
          data.error || data.message || "Failed to return the volume to the library.",
        );
      }
    } catch (error) {
      console.error("Return error:", error);
      toast.danger("An unforeseen disruption occurred while returning the volume.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 dark:from-[#0f0f10] dark:via-[#141416] dark:to-[#0f0f10] py-10 sm:py-12 px-4 sm:px-8 text-[#121212] dark:text-neutral-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              My Reading Desk
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Volumes currently entrusted to your care and companioning your days.
            </p>
          </div>
          <span className="self-start sm:self-auto px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
            {borrowedBooks.length} {borrowedBooks.length === 1 ? "Active Read" : "Active Reads"}
          </span>
        </div>

        {/* Books List / Empty State */}
        {borrowedBooks.length === 0 ? (
          <div className="bg-white dark:bg-[#18181b] p-8 sm:p-12 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 bg-[#ff5b49]/10 text-[#ff5b49] rounded-2xl flex items-center justify-center mx-auto">
              <HiOutlineBookmarkSlash className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
              Your Reading Desk is Clear
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
              No volumes are currently borrowed. Explore our grand catalog to invite your next story home!
            </p>
            <div className="pt-2">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-md shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm cursor-pointer"
              >
                Explore the Catalog
              </Link>
            </div>
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
                borrowDate={item.borrowDate}
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
