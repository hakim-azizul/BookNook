"use client";
import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { HiOutlineBookmark } from "react-icons/hi2";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface BorrowBtnProps {
  bookId: string;
  title: string;
  image: string;
  author: string;
  quantity: string | number;
}

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const BorrowBtn = ({
  bookId,
  title,
  image,
  author,
  quantity,
}: BorrowBtnProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const currentQty =
    typeof quantity === "string" ? parseInt(quantity, 10) : quantity;

  const handleBorrowBook = async () => {
    if (!session?.user) {
      alert("Please sign in to borrow this book!");
      return;
    }

    const borrowData = {
      bookId,
      title,
      image,
      author,
      userEmail: session.user.email,
      userName: session.user.name,
    };

    try {
      setLoading(true);
      const token = await getTokenFromClient();
      const res = await fetch(`${api}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(borrowData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Book borrowed successfully!");
      } else {
        alert(data.error || data.message || "Failed to borrow book.");
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isOutOfStock = currentQty <= 0;

  return (
    <button
      onClick={handleBorrowBook}
      disabled={loading || isOutOfStock}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-2xl shadow-lg transition-all ${
        isOutOfStock
          ? "bg-neutral-300 cursor-not-allowed shadow-none text-neutral-500"
          : "bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-[#ff5b49]/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
      }`}
    >
      <HiOutlineBookmark className="w-5 h-5" />
      <span>
        {loading
          ? "Processing..."
          : isOutOfStock
            ? "Out of Stock"
            : "Borrow This Book"}
      </span>
    </button>
  );
};
export default BorrowBtn;
