"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  HiOutlineBookOpen,
  HiOutlineExclamationTriangle,
  HiXMark,
} from "react-icons/hi2";
import {
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  NumberField,
  ListBox,
  Select,
} from "@heroui/react";
import MyBookCard from "../Components/MyBook/MyBookCard";
import iBook from "@/types/bookType";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const MyBooksPage = () => {
  const { data: session, isPending } = useSession();
  const [myBooks, setMyBooks] = useState<iBook[]>([]);
  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  // Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<iBook | null>(null);
  // Fetch user specific books
  const user = session?.user;

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API_URL}/books/user/${encodeURIComponent(user.email)}`)
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data);
      })
      .catch((err) => {
        console.error("Error fetching my books:", err);
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
            Please Sign In
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            To manage your contributed books and access your personal stock.
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
  // Open Edit Modal
  const handleEditClick = (book: iBook) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };
  // Handle Edit Form Submit (PATCH API Request)
  const handleUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBook) return;

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_URL}/books/${selectedBook._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        // Update local state instantly
        setMyBooks((prev) =>
          prev.map((b) =>
            b._id === selectedBook._id ? { ...b, ...updatedData } : b,
          ),
        );
        setIsEditModalOpen(false);
        setSelectedBook(null);
      } else {
        alert("Failed to update the book.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  // Open Delete Modal
  const openDeleteModal = (id: string) => {
    setBookToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      const res = await fetch(`${API_URL}/books/${bookToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setMyBooks((prev) => prev.filter((book) => book._id !== bookToDelete));
        setIsDeleteModalOpen(false);
        setBookToDelete(null);
      } else {
        alert("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong.");
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
            {myBooks.map((book: iBook) => (
              <MyBookCard
                key={book._id}
                book={book}
                onEdit={handleEditClick}
                onDelete={openDeleteModal}
              />
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {/* Edit Modal */}
        {isEditModalOpen && selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 space-y-6 animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Edit Book Details
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Update your book information below
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              {/* Form with exact fields provided */}
              <Form onSubmit={handleUpdateBook} className="w-full space-y-4">
                <Fieldset className="w-full space-y-4">
                  <Fieldset.Group className="space-y-4">
                    {/* Title & Author */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        isRequired
                        name="title"
                        defaultValue={selectedBook.title}
                        validate={(value) => {
                          if (value.length < 3) {
                            return "Book Title must be at least 3 characters";
                          }
                          return null;
                        }}
                      >
                        <Label>Book Title</Label>
                        <Input placeholder="The Republic" />
                        <FieldError />
                      </TextField>

                      <TextField
                        isRequired
                        name="author"
                        defaultValue={selectedBook.author}
                        validate={(value) => {
                          if (value.length < 3) {
                            return "Author Name must be at least 3 characters";
                          }
                          return null;
                        }}
                      >
                        <Label>Author</Label>
                        <Input placeholder="Plato" />
                        <FieldError />
                      </TextField>
                    </div>

                    {/* Category & Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        className="w-full"
                        name="category"
                        defaultSelectedKey={selectedBook.category?.toLowerCase()}
                        placeholder="Select Category"
                      >
                        <Label>Category</Label>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="fiction" textValue="Fiction">
                              Fiction
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="non-fiction"
                              textValue="Non-Fiction"
                            >
                              Non-Fiction
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="philosophy"
                              textValue="Philosophy"
                            >
                              Philosophy
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item
                              id="science"
                              textValue="Science & Tech"
                            >
                              Science & Tech
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="history" textValue="History">
                              History
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="kids" textValue="Kids">
                              Kids
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="religion" textValue="Religion">
                              Religion
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="others" textValue="Others">
                              Others
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                        <FieldError />
                      </Select>

                      <NumberField
                        isRequired
                        minValue={1}
                        defaultValue={Number(selectedBook.quantity) || 1} // Inayon ti Number(...)
                        name="quantity"
                      >
                        <Label>Quantity</Label>
                        <NumberField.Group className="w-full">
                          <NumberField.DecrementButton />
                          <NumberField.Input className="w-full text-center" />
                          <NumberField.IncrementButton />
                        </NumberField.Group>
                      </NumberField>
                    </div>

                    {/* Image URL */}
                    <TextField
                      isRequired
                      name="image"
                      defaultValue={selectedBook.image}
                      validate={(value) => {
                        try {
                          new URL(value);
                          return null;
                        } catch (_) {
                          return "Please enter a valid image URL";
                        }
                      }}
                    >
                      <Label>Book Image URL</Label>
                      <Input placeholder="https://example.com/image.jpg" />
                      <FieldError />
                    </TextField>

                    {/* Description */}
                    <TextField
                      isRequired
                      name="description"
                      defaultValue={selectedBook.description}
                      validate={(value) => {
                        if (value.length < 10) {
                          return "Description must be at least 10 characters";
                        }
                        return null;
                      }}
                    >
                      <Label>Short Description</Label>
                      <TextArea placeholder="Why should anyone read this book?" />
                      <Description>Minimum 10 characters</Description>
                      <FieldError />
                    </TextField>
                  </Fieldset.Group>
                </Fieldset>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#ff5b49] hover:bg-[#ff0018] transition-colors shadow-sm shadow-[#ff5b49]/30"
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 space-y-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                  <HiOutlineExclamationTriangle className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
                >
                  <HiXMark className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-neutral-900">
                  Delete Book Confirmation
                </h3>
                <p className="text-sm text-neutral-500">
                  Are you sure you want to permanently delete this book from the
                  library? This action cannot be undone.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#ff5b49] hover:bg-[#ff0018] transition-colors shadow-sm shadow-[#ff5b49]/30"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksPage;
