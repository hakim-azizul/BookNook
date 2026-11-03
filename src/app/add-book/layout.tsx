import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Book | Share with the Community",
  description:
    "Contribute a new book to the BookNook community library."
};

export default function AddBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
