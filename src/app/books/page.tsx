import type { Metadata } from "next";
import iBook from "@/types/bookType";
import BookCard from "../Components/Shared/BookCard";

export const metadata: Metadata = {
  title: "All Books | The Grand Library Catalog",
  description:
    "Wander through our complete communal catalog of books spanning fiction, philosophy, science, and history. Discover your next companion to borrow.",
};

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AllBooksPage = async () => {
  let books = [];
  try {
    const res = await fetch(`${api}/allBooks`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      books = await res.json();
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  if (!books || books.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400 space-y-2 px-4 text-center">
        <p className="text-xl font-bold text-neutral-800 dark:text-neutral-200">The Shelves are Momentarily Still</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
          No volumes are currently on display in the catalog. Check back shortly or bestow your own books upon the collection.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#121212] dark:text-neutral-100 px-4 sm:px-8 py-10 sm:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col items-center text-center space-y-3">
          <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
            Communal Sanctuary
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">
            The Grand{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff5b49] to-[#ff0018]">
              Library Catalog
            </span>
          </h1>

          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl text-sm sm:text-base leading-relaxed">
            Step through aisles of philosophy, vibrant poetry, gripping narratives, and
            transformative ideas. Every spine holds an invitation to explore.
          </p>
          <div className="w-16 h-1 bg-linear-to-r from-[#ff5b49] to-[#ff0018] rounded-full mt-2" />
        </div>

        {Array.isArray(books) && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {books.map((book: iBook) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              No volumes cataloged in the archives yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
