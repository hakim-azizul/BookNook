import iBook from "@/types/bookType";
import BookCard from "../Shared/BookCard";
import Link from "next/link";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const NewArraivals = async () => {
  const token = await getTokenFromServer();

  let newBooks = [];
  try {
    const res = await fetch(`${api}/new-arrivals`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      newBooks = await res.json();
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
  if (!newBooks || newBooks.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-500">
        No books found or failed to load.
      </div>
    );
  }
  return (
    <section className="py-16 px-4 sm:px-8 bg-linear-to-b from-neutral-50 via-white to-neutral-100 text-[#121212]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
          <div className="space-y-3 text-center md:text-left">
            {/* Top Badge */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20 shadow-xs">
              ✨ Freshly Added
            </span>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff5b49] to-[#ff0018]">
                New Arrivals
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-neutral-600 max-w-xl text-sm sm:text-base">
              Dive into the latest literary masterpieces and community-shared
              treasures freshly added to our digital library.
            </p>
          </div>

          {/* View All Books Action Button */}
          <div className="flex justify-center md:justify-end">
            <Link
              href="/books"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] rounded-2xl shadow-lg shadow-[#ff5b49]/25 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>View All Books</span>
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Books Grid with Responsive Screen Size Filtering */}
        {Array.isArray(newBooks) && newBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {newBooks.map((newBook: iBook, index: number) => {
              let visibilityClass = "";
              if (index >= 6 && index < 9) {
                visibilityClass = "hidden sm:block";
              } else if (index >= 9) {
                visibilityClass = "hidden lg:block";
              }

              return (
                <div
                  key={newBook._id || index}
                  className={`w-full flex justify-center ${visibilityClass}`}
                >
                  <BookCard book={newBook} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 shadow-sm">
            <p className="text-neutral-500 text-lg">
              No new arrivals found at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArraivals;
