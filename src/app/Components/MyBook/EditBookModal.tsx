"use client";
import React from "react";
import {
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  NumberField,
  ListBox,
  Select,
} from "@heroui/react";
import { HiXMark } from "react-icons/hi2";
import iBook from "@/types/bookType";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: iBook | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isUpdating: boolean;
}

export default function EditBookModal({
  isOpen,
  onClose,
  book,
  onSubmit,
  isUpdating,
}: EditBookModalProps) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#0f0007] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 dark:border-neutral-800 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Refine Volume Details
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Update the catalog record for this work
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close edit dialog"
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        <Form
          key={book._id}
          onSubmit={onSubmit}
          className="w-full space-y-4"
        >
          <Fieldset className="w-full space-y-4">
            <Fieldset.Group className="space-y-4">
              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="title"
                  defaultValue={book.title}
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Title must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Title of the Work</Label>
                  <Input placeholder="The Republic" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="author"
                  defaultValue={book.author}
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Author name must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Literary Architect / Author</Label>
                  <Input placeholder="Plato" />
                  <FieldError />
                </TextField>
              </div>

              {/* Category & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  className="w-full"
                  name="category"
                  defaultSelectedKey={book.category?.toLowerCase()}
                  placeholder="Select Literary Realm"
                >
                  <Label>Literary Realm</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="fiction" textValue="Fiction">
                        Fiction / Literature
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="non-fiction" textValue="Non-Fiction">
                        Non-Fiction
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="philosophy" textValue="Philosophy">
                        Philosophy / Thought
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="science" textValue="Science & Tech">
                        Science &amp; Technology
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="history" textValue="History">
                        History / Chronicle
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="kids" textValue="Kids">
                        Young Readers
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="religion" textValue="Religion">
                        Spirituality
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="others" textValue="Others">
                        Rare Works
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                  <FieldError />
                </Select>

                <NumberField
                  isRequired
                  minValue={1}
                  defaultValue={Number(book.quantity) || 1}
                  name="quantity"
                >
                  <Label>Copies in Circulation</Label>
                  <NumberField.Group className="w-full">
                    <NumberField.DecrementButton />
                    <NumberField.Input className="w-full text-center" />
                    <NumberField.IncrementButton />
                  </NumberField.Group>
                </NumberField>
              </div>

              {/* Image URL */}
              <TextField
                isRequired
                name="image"
                defaultValue={book.image}
                validate={(value) => {
                  try {
                    new URL(value);
                    return null;
                  } catch {
                    return "Please enter a valid cover artwork URL";
                  }
                }}
              >
                <Label>Cover Artwork URL</Label>
                <Input placeholder="https://example.com/cover.jpg" />
                <FieldError />
              </TextField>

              {/* Description */}
              <TextField
                isRequired
                name="description"
                defaultValue={book.description}
                validate={(value) => {
                  if (value.length < 10) {
                    return "Synopsis must be at least 10 characters";
                  }
                  return null;
                }}
              >
                <Label>Synopsis &amp; Reader&apos;s Invitation</Label>
                <TextArea placeholder="What makes this volume unforgettable?" />
                <Description>Minimum 10 characters</Description>
                <FieldError />
              </TextField>
            </Fieldset.Group>
          </Fieldset>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#ff5b49] hover:bg-[#ff0018] transition-colors shadow-sm shadow-[#ff5b49]/30 cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? "Saving Amendments..." : "Save Amendments"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
