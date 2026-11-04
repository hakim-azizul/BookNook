import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Archives | Contributed Books Management",
  description:
    "View, manage, edit, and track all the books you have contributed to the BookNook library collection.",
};

export default function MyBooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
