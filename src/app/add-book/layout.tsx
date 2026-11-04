import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share with Community",
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
