import BookDetails from "@/app/Components/BookDetails/BookDetails";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  let book = null;
  try {
    const res = await fetch(`${api}/allBooks/${id}`);
    if (res.ok) {
      book = await res.json();
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-500">
        Book not found or failed to load.
      </div>
    );
  }
  return (
    <div>
      <BookDetails book={book} />
    </div>
  );
};

export default BookDetailsPage;
