"use client";
import React from "react";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  toast,
} from "@heroui/react";
import { SiGoogle } from "react-icons/si";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") ||
    searchParams.get("callbackURL") ||
    searchParams.get("redirect") ||
    searchParams.get("redirectTo") ||
    "/";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error: signUpError } = await signUp.email({
        name: data.name as string,
        image: data.image as string,
        email: data.email as string,
        password: data.password as string,
      });

      if (signUpError) {
        toast.danger(signUpError.message || "Unable to complete registration. Please try again.");
      } else {
        toast.success("Welcome to BookNook! Your reader account has been created. Please sign in.");
        const nextTarget =
          callbackUrl && callbackUrl !== "/"
            ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
            : "/signin";
        router.push(nextTarget);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.danger("An unexpected disruption occurred during enrollment.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: callbackUrl && callbackUrl !== "/" ? callbackUrl : "/",
      });
      if (error) {
        toast.danger(error.message || "Google registration was unsuccessful.");
      } else {
        toast.success("Welcome to the BookNook fellowship!");
      }
    } catch (error) {
      console.error("Google signin error:", error);
      toast.danger("Google registration could not be completed.");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-4 sm:p-6 min-h-[80vh]">
      <Surface className="w-full max-w-xl p-6 sm:p-12 rounded-3xl bg-[#f4f6f0] shadow-xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-rose-500 text-2xl font-bold">
              Cross the Threshold into BookNook
            </Fieldset.Legend>
            <Description className="text-[#1a1a1a] mb-4">
              Become part of an enduring fellowship of curious minds, avid readers, and generous curators.
            </Description>
            <Fieldset.Group className="space-y-4">
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Reader name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Your Chosen Reader Name</Label>
                <Input placeholder="e.g. Eleanor Vance" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="image"
                validate={(value) => {
                  try {
                    new URL(value);
                    return null;
                  } catch {
                    return "Please enter a valid portrait image URL";
                  }
                }}
              >
                <Label>Portrait Image URL</Label>
                <Input placeholder="https://example.com/portrait.jpg" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid correspondence address";
                  }
                  return null;
                }}
              >
                <Label>Reader Correspondence (Email)</Label>
                <Input placeholder="reader@booknook.com" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                minLength={6}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 6) {
                    return "Secret key must be at least 6 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Secret key must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Secret key must contain at least one numeral";
                  }
                  return null;
                }}
              >
                <Label>Secret Key (Password)</Label>
                <Input placeholder="Craft a resilient secret key" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Fieldset.Actions className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 w-full">
                <Button
                  className="bg-[#1a1a1a] text-white w-full py-2.5 rounded-xl cursor-pointer hover:bg-neutral-800 transition-colors"
                  type="submit"
                >
                  Begin Your Journey
                </Button>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full py-2.5 rounded-xl cursor-pointer"
                >
                  Reset
                </Button>
              </div>
              <Button
                onPress={handleGoogleSignIn}
                className="w-full border border-[#a1a1a1] hover:border-[#ff5b49] py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                variant="secondary"
              >
                <SiGoogle className="text-[#ff5b49] w-4 h-4" />
                Enroll with Google
              </Button>
            </Fieldset.Actions>

            <h4 className="mt-6 text-center text-sm text-neutral-600">
              Already have a place at our hearth?{" "}
              <span>
                <Link
                  className="text-[#ff0018] underline font-medium"
                  href={
                    callbackUrl && callbackUrl !== "/"
                      ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
                      : "/signin"
                  }
                >
                  Enter Sanctuary
                </Link>
              </span>
            </h4>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
};

export default SignUpPage;
