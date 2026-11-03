import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Borrows | Borrowed Books Tracker",
  description:
    "Track and manage the books you have borrowed from the BookNook community library. View borrowing dates and return books.",
};

export default function MyBorrowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
