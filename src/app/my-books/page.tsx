"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import iBook from "@/types/bookType";

import MyBookCard from "@/app/Components/MyBook/MyBookCard";
import EditBookModal from "@/app/Components/MyBook/EditBookModal";
import DeleteBookModal from "@/app/Components/MyBook/DeleteBookModal";
import MyBooksHeader from "@/app/Components/MyBook/MyBooksHeader";
import MyBooksEmptyState from "@/app/Components/MyBook/MyBooksEmptyState";
import MyBooksSkeleton from "@/app/Components/MyBook/MyBooksSkeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MyBooksPage = () => {
  const { data: session, isPending } = useSession();
  const [myBooks, setMyBooks] = useState<iBook[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<iBook | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const user = session?.user;

  useEffect(() => {
    let ignore = false;
    const userEmail = user?.email;

    if (!userEmail) {
      return;
    }

    const loadBooks = async () => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(
          `${API_URL}/books/user/${encodeURIComponent(userEmail)}`,
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
            setMyBooks(data);
          } else {
            setMyBooks([]);
          }
          setIsFetching(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching my books:", err);
          toast.danger("Could not retrieve your curated archives. Please try refreshing.");
          setMyBooks([]);
          setIsFetching(false);
        }
      }
    };

    loadBooks();

    return () => {
      ignore = true;
    };
  }, [user?.email]);

  // Open Edit Modal
  const handleEditClick = (book: iBook) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  // Submit book updates
  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBook) return;

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    const payload = {
      title: String(updatedData.title || "").trim(),
      author: String(updatedData.author || "").trim(),
      category: String(updatedData.category || "").trim(),
      quantity: String(updatedData.quantity || 1),
      image: String(updatedData.image || "").trim(),
      description: String(updatedData.description || "").trim(),
    };

    try {
      setIsUpdating(true);
      const token = await getTokenFromClient();
      const res = await fetch(`${API_URL}/books/${selectedBook._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Update local state without full reload
        setMyBooks((prev) =>
          prev.map((b) =>
            b._id === selectedBook._id ? ({ ...b, ...payload } as iBook) : b,
          ),
        );
        setIsEditModalOpen(false);
        setSelectedBook(null);
        toast.success("Volume details gracefully updated in the catalog!");
      } else {
        toast.danger(data.error || data.message || "Failed to update volume record.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.danger("An unexpected disruption occurred during the update.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Open Delete Confirmation Modal
  const openDeleteModal = (id: string, title: string) => {
    setBookToDelete({ id, title });
    setIsDeleteModalOpen(true);
  };

  // Confirm and execute book deletion
  const confirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      setIsDeleting(true);
      const token = await getTokenFromClient();
      const res = await fetch(`${API_URL}/books/${bookToDelete.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMyBooks((prev) => prev.filter((b) => b._id !== bookToDelete.id));
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
        toast.success("Volume has been retired from circulation.");
      } else {
        toast.danger(data.error || data.message || "Failed to retire volume.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.danger("An unexpected disruption occurred during volume retirement.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Loading skeleton state
  if (isPending || (user && isFetching && myBooks.length === 0)) {
    return <MyBooksSkeleton />;
  }

  // Unauthenticated user state
  if (!user) {
    return (
      <div className="min-h-[70vh] bg-neutral-50 dark:bg-[#0f0f10] flex flex-col justify-center items-center px-4 transition-colors duration-200">
        <div className="bg-white dark:bg-[#18181b] p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl text-center max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            A Curator&apos;s Hearth Awaits
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Please sign in to oversee the volumes you have bequeathed and manage your personal contributions.
          </p>
          <Link
            href="/signin?callbackUrl=/my-books"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm cursor-pointer"
          >
            Enter Sanctuary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-100 dark:from-[#0f0f10] dark:via-[#141416] dark:to-[#0f0f10] py-10 sm:py-12 px-4 sm:px-8 text-[#121212] dark:text-neutral-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Component */}
        <MyBooksHeader count={myBooks.length} />

        {/* Book List or Empty State */}
        {myBooks.length === 0 ? (
          <MyBooksEmptyState />
        ) : (
          <div className="space-y-4">
            {myBooks.map((book: iBook) => (
              <MyBookCard
                key={book._id}
                book={book}
                onEdit={handleEditClick}
                onDelete={(id, title) => openDeleteModal(id, title)}
              />
            ))}
          </div>
        )}

        {/* Refactored Edit Book Modal */}
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBook(null);
          }}
          book={selectedBook}
          onSubmit={handleUpdateBook}
          isUpdating={isUpdating}
        />

        {/* Refactored Delete Book Modal */}
        <DeleteBookModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setBookToDelete(null);
          }}
          bookTitle={bookToDelete?.title}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default MyBooksPage;
