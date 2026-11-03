"use client";
import React, { useState } from "react";
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
  toast,
} from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AddBookPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl text-center max-w-md w-full space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800">
            A Curator&apos;s Hearth Awaits
          </h2>
          <p className="text-neutral-500 text-sm">
            Please sign in to bestow and catalog a volume within the BookNook sanctuary.
          </p>
          <Link
            href="/signin?callbackUrl=/add-book"
            className="inline-block w-full py-3 px-6 rounded-2xl font-semibold text-white bg-linear-to-r from-[#ff5b49] to-[#ff0018] shadow-lg shadow-[#ff5b49]/20 hover:opacity-95 transition-all text-sm cursor-pointer"
          >
            Enter to Contribute
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const newBook = {
      ...formValues,
      quantity: Number(formValues.quantity) || 1,
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const token = await getTokenFromClient();
      const res = await fetch(`${api}/add-book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });

      const afterSubmit = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Your volume has been cataloged and welcomed into the archives!");
        router.push("/books");
      } else {
        toast.danger(
          afterSubmit.error || afterSubmit.message || "Failed to catalog volume.",
        );
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.danger("An unexpected disruption occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-surface">
      <Surface className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#f4f6f0] shadow-xl">
        <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-[#ff5b49] text-2xl font-bold">
              Bestow a Volume
            </Fieldset.Legend>
            <Description className="text-gray-500 mb-4">
              Enrich our communal sanctuary. Share timeless prose, keen inquiry, or evocative storytelling.
            </Description>
            <Fieldset.Group className="space-y-4">
              {/* Title & Author */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="title"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Title must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Title of the Work</Label>
                  <Input placeholder="e.g. The Republic" />
                  <FieldError />
                </TextField>
                <TextField
                  isRequired
                  name="author"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Author name must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Literary Architect / Author</Label>
                  <Input placeholder="e.g. Plato" />
                  <FieldError />
                </TextField>
              </div>

              {/* Category & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  className="w-full"
                  name="category"
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
                        Fiction &amp; Literature
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="non-fiction" textValue="Non-Fiction">
                        Non-Fiction &amp; Essays
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="philosophy" textValue="Philosophy">
                        Philosophy &amp; Thought
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="science" textValue="Science & Tech">
                        Science &amp; Technology
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="history" textValue="History">
                        History &amp; Chronicle
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="kids" textValue="Kids">
                        Children &amp; Young Readers
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Religion" textValue="Religion">
                        Theology &amp; Spirituality
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Others" textValue="Others">
                        General &amp; Rare Works
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
                  <Label>Copies to Circulate</Label>
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
                validate={(value) => {
                  if (value.length < 10) {
                    return "Synopsis must be at least 10 characters";
                  }
                  return null;
                }}
              >
                <Label>Synopsis &amp; Reader&apos;s Invitation</Label>
                <TextArea placeholder="What makes this volume unforgettable? What will a reader discover within its pages?" />
                <Description>Minimum 10 characters to capture the essence of the work</Description>
                <FieldError />
              </TextField>

              {/* Contributor Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isReadOnly
                  name="contributorName"
                  defaultValue={user?.name || ""}
                >
                  <Label>Curating Reader</Label>
                  <Input />
                  <FieldError />
                </TextField>

                <TextField
                  isReadOnly
                  name="contributorEmail"
                  type="email"
                  defaultValue={user?.email || ""}
                >
                  <Label>Curator Correspondence</Label>
                  <Input />
                  <FieldError />
                </TextField>
              </div>
            </Fieldset.Group>

            {/* Actions */}
            <Fieldset.Actions className="mt-6 flex items-center justify-end gap-3">
              <Button
                className="bg-[#1a1a1a] text-white hover:bg-[#ff5b49] transition-colors cursor-pointer disabled:opacity-50"
                type="submit"
                isDisabled={loading}
              >
                {loading ? "Cataloging..." : "Catalog Volume"}
              </Button>
              <Button type="reset" variant="secondary" className="cursor-pointer">
                Reset
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
};

export default AddBookPage;
