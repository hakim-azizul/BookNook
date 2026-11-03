import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description:
    "Your BookNook member profile, and library activity.",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
