"use client";
import {
  Button,
  Description,
  FieldError,
  Surface,
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
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AddBookPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  if (isPending) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4 flex justify-center items-center">
        <div className="max-w-xl w-full bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm animate-pulse space-y-6">
          <div className="space-y-2">
            <div className="h-7 w-48 bg-neutral-300 rounded-lg" />
            <div className="h-4 w-72 bg-neutral-200 rounded-md" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-neutral-200 rounded-md" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-neutral-200 rounded-md" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-neutral-200 rounded-md" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-neutral-200 rounded-md" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-neutral-200 rounded-md" />
              <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 bg-neutral-200 rounded-md" />
              <div className="h-24 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-neutral-200 rounded-md" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-16 bg-neutral-200 rounded-md" />
                <div className="h-11 w-full bg-neutral-100 rounded-xl border border-neutral-200" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <div className="h-10 w-24 bg-neutral-200 rounded-xl" />
            <div className="h-10 w-28 bg-neutral-300 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-[70vh] bg-neutral-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">
            Please sign in
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            To make a contribution.
          </p>
          <Link
            href="/signin"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBook = Object.fromEntries(formData.entries());
    console.log(newBook);

    const token = await getTokenFromClient();
    const res = await fetch(`${api}/add-book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBook),
    });

    const afterSubmit = await res.json();
    console.log(afterSubmit);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-surface">
      <Surface className="w-full max-w-xl p-8 rounded-3xl bg-[#f4f6f0] shadow-xl">
        <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-[#ff5b49] text-2xl font-bold">
              Add a New Book
            </Fieldset.Legend>
            <Description className="text-gray-400 mb-4">
              Make a contribution to grow our digital library today!
            </Description>
            <Fieldset.Group className="space-y-4">
              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="title"
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
                      <ListBox.Item id="kids" textValue="kids">
                        Kids
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Religion" textValue="Religion">
                        Religion
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Others" textValue="Others">
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
                  defaultValue={1}
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
              <TextField
                isRequired
                name="image"
                validate={(value) => {
                  try {
                    new URL(value);
                    return null;
                  } catch (_) {
                    return "Please enter a valid image URL";
                    console.log(_);
                  }
                }}
              >
                <Label>Book Image URL</Label>
                <Input placeholder="https://example.com/image.jpg" />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                name="description"
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

              {/* Contributor Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isReadOnly
                  name="contributorName"
                  defaultValue={user?.name || ""}
                >
                  <Label>Contributor</Label>
                  <Input />
                  <FieldError />
                </TextField>

                <TextField
                  isReadOnly
                  name="contributorEmail"
                  type="email"
                  defaultValue={user?.email || ""}
                >
                  <Label>Email</Label>
                  <Input />
                  <FieldError />
                </TextField>
              </div>
            </Fieldset.Group>

            {/* Actions */}
            <Fieldset.Actions className="mt-6 flex items-center justify-end gap-3">
              <Button
                className="bg-[#1a1a1a] text-white hover:bg-[#ff5b49] transition-colors"
                type="submit"
              >
                Add Book
              </Button>
              <Button type="reset" variant="secondary">
                Cancel
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
};

export default AddBookPage;
