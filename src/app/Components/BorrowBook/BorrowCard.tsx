"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Modal } from "@heroui/react";
import {
  HiOutlineArrowUturnLeft,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

interface BorrowCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
  borrowDate?: string;
  onReturn: (id: string) => Promise<void> | void;
}

const BorrowCard = ({
  id,
  title,
  author,
  image,
  borrowDate,
  onReturn,
}: BorrowCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400";

  const handleConfirmReturn = async () => {
    try {
      setLoading(true);
      await onReturn(id);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to return:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all group">
        {/* Left: Image & Info */}
        <div className="flex items-center gap-4 w-full sm:w-auto min-w-0">
          <div className="relative w-20 h-24 sm:w-24 sm:h-32 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
            <Image
              src={image || fallbackImage}
              alt={title || "Borrowed Book"}
              fill
              sizes="96px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <span className="inline-block px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#ff5b49]/10 text-[#ff5b49] border border-[#ff5b49]/20">
              Borrowed
            </span>
            <h3 className="font-extrabold text-neutral-900 text-base sm:text-lg truncate">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 truncate">
              By <span className="text-[#ff5b49] font-medium">{author}</span>
            </p>

            {/* Borrow Date */}
            {borrowDate && (
              <p className="text-[11px] sm:text-xs text-neutral-400 font-medium pt-0.5">
                Borrowed on:{" "}
                <span className="text-neutral-700">
                  {new Date(borrowDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Right: Return Button */}
        <div className="w-full sm:w-auto flex justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
          <button
            onClick={() => setIsOpen(true)}
            aria-label={`Return ${title}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-2xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
          >
            <HiOutlineArrowUturnLeft className="w-4 h-4" />
            <span>Return Book</span>
          </button>
        </div>
      </div>

      {/* HeroUI Blur Backdrop Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop variant="blur">
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-md p-2">
              <Modal.CloseTrigger />

              <Modal.Header className="flex flex-col items-center text-center space-y-2 pt-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-100">
                  <HiOutlineExclamationTriangle className="w-6 h-6" />
                </div>
                <Modal.Heading className="text-xl font-bold text-neutral-900">
                  Return this book?
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="text-center text-sm text-neutral-500 px-4 py-2">
                Are you sure you want to return{" "}
                <span className="font-semibold text-neutral-800">
                  &ldquo;{title}&rdquo;
                </span>
                ? Once returned, it will be removed from your borrowed list.
              </Modal.Body>

              <Modal.Footer className="flex gap-3 pt-4">
                <Button
                  variant="secondary"
                  className="w-full rounded-xl font-semibold cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 cursor-pointer disabled:opacity-50"
                  isDisabled={loading}
                  onClick={handleConfirmReturn}
                >
                  {loading ? "Returning..." : "Confirm Return"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default BorrowCard;
