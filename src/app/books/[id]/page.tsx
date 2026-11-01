import React from "react";

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${api}/allBooks/${id}`);
  const data = await res.json();
  const book = data;
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetailsPage;
