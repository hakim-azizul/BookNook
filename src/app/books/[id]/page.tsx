import type { Metadata } from "next";
import BookDetails from "@/app/Components/BookDetails/BookDetails";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const token = await getTokenFromServer();

  try {
    const res = await fetch(`${api}/allBooks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const book = await res.json();
      if (book?.title) {
        return {
          title: `${book.title} by ${book.author || "Unknown"}`,
          description:
            book.description ||
            `Read and borrow "${book.title}" from the BookNook digital community library.`,
          openGraph: {
            title: `${book.title} | BookNook`,
            description:
              book.description || `Borrow ${book.title} on BookNook.`,
            images: book.image ? [{ url: book.image }] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error("Error generating metadata for book:", error);
  }

  return {
    title: "Book Details",
    description: "View book details and borrow options on BookNook.",
  };
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { id } = await params;
  const token = await getTokenFromServer();

  let book = null;
  try {
    const res = await fetch(`${api}/allBooks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      book = await res.json();
    }
  } catch (error) {
    console.error("Error fetching book details:", error);
  }

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-neutral-500 space-y-2 px-4">
        <p className="text-lg font-semibold">Book not found or failed to load.</p>
        <p className="text-sm text-neutral-400">The book you are looking for may have been removed or is unavailable.</p>
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
