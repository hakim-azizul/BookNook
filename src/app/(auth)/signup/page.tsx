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
        toast.danger(signUpError.message || "Signup failed. Please try again.");
      } else {
        toast.success("Account created successfully! Please sign in.");
        const nextTarget =
          callbackUrl && callbackUrl !== "/"
            ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
            : "/signin";
        router.push(nextTarget);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.danger("Something went wrong during signup.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: callbackUrl && callbackUrl !== "/" ? callbackUrl : "/",
      });
      if (error) {
        toast.danger(error.message || "Google signin failed.");
      } else {
        toast.success("Google signin successful!");
      }
    } catch (error) {
      console.error("Google signin error:", error);
      toast.danger("Google signin error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-4 sm:p-6 min-h-[80vh]">
      <Surface className="w-full max-w-xl p-6 sm:p-12 rounded-3xl bg-[#f4f6f0] shadow-xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-rose-500 text-2xl font-bold">
              Join BookNook
            </Fieldset.Legend>
            <Description className="text-[#1a1a1a] mb-4">
              Signup with your credentials, to join the reader community
            </Description>
            <Fieldset.Group className="space-y-4">
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Name</Label>
                <Input placeholder="John Doe" />
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
                    return "Please enter a valid image URL";
                  }
                }}
              >
                <Label>Profile Image URL</Label>
                <Input placeholder="https://example.com/avatar.jpg" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label>Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                minLength={6}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 6) {
                    return "Password must be at least 6 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label>Password</Label>
                <Input placeholder="Create a strong password" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Fieldset.Actions className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 w-full">
                <Button
                  className="bg-[#1a1a1a] text-white w-full py-2.5 rounded-xl cursor-pointer"
                  type="submit"
                >
                  Create Account
                </Button>
                <Button
                  type="reset"
                  variant="secondary"
                  className="w-full py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
              <Button
                onPress={handleGoogleSignIn}
                className="w-full border border-[#a1a1a1] hover:border-[#ff5b49] py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                variant="secondary"
              >
                <SiGoogle className="text-[#ff5b49] w-4 h-4" />
                Sign up with Google
              </Button>
            </Fieldset.Actions>

            <h4 className="mt-6 text-center text-sm text-neutral-600">
              Already have an account?{" "}
              <span>
                <Link
                  className="text-[#ff0018] underline font-medium"
                  href={
                    callbackUrl && callbackUrl !== "/"
                      ? `/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`
                      : "/signin"
                  }
                >
                  SIGN IN
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
