import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join BookNook | Create Account",
  description:
    "Join the BookNook reading community. Create an account to borrow books, contribute to the bookshelf, and connect with fellow readers.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
