import BookDetails from "@/app/Components/BookDetails/BookDetails";
import React from "react";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  const res = await fetch(`${api}/allBooks/${id}`);
  const data = await res.json();
  const book = data;
  return (
    <div>
      <BookDetails book={book} />
    </div>
  );
};
export default BookDetailsPage;
