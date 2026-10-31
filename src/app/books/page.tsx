import iBook from "@/types/bookType";
import React from "react";
import BookCard from "../Components/Shared/BookCard";

const AllBooksPage = async () => {
  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${api}/allBooks`);
  const data = await res.json();
  const books = data;
  return (
    <div>
      <h2>All Books</h2>
      <div>
        {
            books.map((book:iBook) => <BookCard key={book._id} book={book}></BookCard>)
        }
        </div>
    </div>
  );
};

export default AllBooksPage;
