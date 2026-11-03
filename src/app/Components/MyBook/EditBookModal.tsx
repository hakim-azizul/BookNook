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
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-100 space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-900">
              Edit Book Details
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Update your book information below
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close edit dialog"
            className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
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
                      return "Book Title must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Book Title</Label>
                  <Input placeholder="The Republic" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  name="author"
                  defaultValue={book.author}
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Author Name must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Author</Label>
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
                  placeholder="Select Category"
                >
                  <Label>Category</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="fiction" textValue="Fiction">
                        Fiction
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="non-fiction" textValue="Non-Fiction">
                        Non-Fiction
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="philosophy" textValue="Philosophy">
                        Philosophy
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="science" textValue="Science & Tech">
                        Science & Tech
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="history" textValue="History">
                        History
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="kids" textValue="Kids">
                        Kids
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="religion" textValue="Religion">
                        Religion
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="others" textValue="Others">
                        Others
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
                  <Label>Quantity</Label>
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
                    return "Please enter a valid image URL";
                  }
                }}
              >
                <Label>Book Image URL</Label>
                <Input placeholder="https://example.com/image.jpg" />
                <FieldError />
              </TextField>

              {/* Description */}
              <TextField
                isRequired
                name="description"
                defaultValue={book.description}
                validate={(value) => {
                  if (value.length < 10) {
                    return "Description must be at least 10 characters";
                  }
                  return null;
                }}
              >
                <Label>Short Description</Label>
                <TextArea placeholder="Why should anyone read this book?" />
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
              {isUpdating ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
