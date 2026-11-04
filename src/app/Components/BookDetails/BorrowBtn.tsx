"use client";
import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  HiOutlineBookmark,
} from "react-icons/hi2";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Modal, Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";

interface BorrowBtnProps {
  bookId: string;
  title: string;
  image: string;
  author: string;
  quantity: string | number;
}

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const BorrowBtn = ({
  bookId,
  title,
  image,
  author,
  quantity,
}: BorrowBtnProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentQty =
    typeof quantity === "string" ? parseInt(quantity, 10) : quantity;

  const handleOpenModal = () => {
    if (!session?.user) {
      toast.danger("Please sign in to borrow this volume!");
      router.push(`/signin?callbackUrl=/books/${bookId}`);
      return;
    }
    setIsOpen(true);
  };

  const handleBorrowBook = async () => {
    if (!session?.user) return;

    const borrowData = {
      bookId,
      title,
      image,
      author,
      userEmail: session.user.email,
      userName: session.user.name,
    };

    try {
      setLoading(true);
      const token = await getTokenFromClient();
      const res = await fetch(`${api}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(borrowData),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        toast.success("A new chapter begins. Enjoy your journey with this volume!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.danger(data.error || data.message || "Unable to reserve this volume right now.");
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.danger("An unforeseen disruption occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isOutOfStock = currentQty <= 0;

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={loading || isOutOfStock}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-2xl shadow-lg transition-all cursor-pointer ${
          isOutOfStock
            ? "bg-neutral-300 cursor-not-allowed shadow-none text-neutral-500"
            : "bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-[#ff5b49]/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        }`}
      >
        <HiOutlineBookmark className="w-5 h-5" />
        <span>{isOutOfStock ? "Currently on Loan" : "Borrow This Volume"}</span>
      </button>

      {/* HeroUI Blur Backdrop Confirmation Modal with Read-Only Details */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-md p-2 bg-white dark:bg-[#18181b] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800">
              <Modal.CloseTrigger />

              <Modal.Header className="flex flex-col items-center text-center space-y-2 pt-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm"
                  style={{
                    backgroundColor: "rgba(255, 0, 24, 0.08)",
                    color: "#ff0018",
                    borderColor: "rgba(255, 0, 24, 0.2)",
                  }}
                >
                  <HiOutlineBookmark className="w-5 h-5" />
                </div>
                <Modal.Heading className="text-xl font-bold text-neutral-900 dark:text-white">
                  Reserve This Volume
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="space-y-3 px-4 py-3 text-sm">
                <p className="text-neutral-500 dark:text-neutral-400 text-center text-xs">
                  Review your reading pact before the volume is entrusted to your care:
                </p>

                {/* Read-only Information Fields */}
                <div className="space-y-2 bg-neutral-50 dark:bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-200/70 dark:border-neutral-800">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Title of the Work
                    </label>
                    <p className="font-bold text-neutral-900 dark:text-white text-sm line-clamp-1">
                      {title}
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Borrowing Reader
                    </label>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm">
                      {session?.user?.name || "Bibliophile"}
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Reader Correspondence
                    </label>
                    <p className="font-medium text-neutral-700 dark:text-neutral-300 text-xs">
                      {session?.user?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  className="w-full rounded-xl font-semibold cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Remain Browsing
                </Button>
                <Button
                  className="w-full rounded-xl font-semibold text-white shadow-md cursor-pointer"
                  style={{ backgroundColor: "#ff0018" }}
                  isDisabled={loading}
                  onClick={handleBorrowBook}
                >
                  {loading ? "Entrusting..." : "Confirm & Borrow"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BorrowBtn;
