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
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract redirect target from any standard callback / redirect query parameter
  const urlCallback =
    searchParams.get("callbackUrl") ||
    searchParams.get("callbackURL") ||
    searchParams.get("redirect") ||
    searchParams.get("redirectTo") ||
    searchParams.get("returnUrl") ||
    searchParams.get("from") ||
    searchParams.get("next");

  // Smart redirect handler: handles callback query, sessionStorage cache, and referrer
  const getRedirectPath = () => {
    if (urlCallback) {
      try {
        const decoded = decodeURIComponent(urlCallback);
        if (decoded.startsWith("/")) {
          return decoded;
        }
        if (typeof window !== "undefined") {
          const parsed = new URL(decoded, window.location.origin);
          if (parsed.origin === window.location.origin) {
            return parsed.pathname + parsed.search;
          }
        }
      } catch {
        if (urlCallback.startsWith("/")) return urlCallback;
      }
    }

    if (typeof window !== "undefined") {
      // Check session storage if redirected earlier
      const storedRedirect = sessionStorage.getItem("authRedirect");
      if (storedRedirect) {
        sessionStorage.removeItem("authRedirect");
        return storedRedirect;
      }

      // Check document.referrer
      if (document.referrer) {
        try {
          const referrerUrl = new URL(document.referrer);
          if (
            referrerUrl.origin === window.location.origin &&
            !referrerUrl.pathname.includes("/signin") &&
            !referrerUrl.pathname.includes("/signup")
          ) {
            return referrerUrl.pathname + referrerUrl.search;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    return "/";
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error: signInError } = await signIn.email({
        email: data.email as string,
        password: data.password as string,
      });

      if (signInError) {
        toast.danger(
          signInError.message ||
            "Sign in failed. Please check your credentials.",
        );
      } else {
        toast.success("Sign in successful!");
        const redirectTo = getRedirectPath();
        router.push(redirectTo);
        router.refresh();
      }
    } catch (error) {
      console.error("Signin error:", error);
      toast.danger("Something went wrong. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const redirectTo = getRedirectPath();
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: redirectTo,
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

  const targetPath = getRedirectPath();

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-4 sm:p-6 min-h-[80vh]">
      <Surface className="w-full max-w-xl p-6 sm:p-12 rounded-3xl bg-[#f4f6f0] shadow-xl">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-rose-500 text-2xl font-bold">
              Welcome Back
            </Fieldset.Legend>
            <Description className="text-[#1a1a1a] mb-4">
              Read continuously, Share insights, Grow community.
            </Description>
            <Fieldset.Group className="space-y-4">
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
                <Input placeholder="Enter your password" />
                <Description>
                  If you forgot your password.{" "}
                  <span className="text-[#ff5b49] underline cursor-pointer">
                    Click Here
                  </span>
                </Description>
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Fieldset.Actions className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3 w-full">
                <Button
                  className="bg-[#1a1a1a] text-white w-full py-2.5 rounded-xl cursor-pointer"
                  type="submit"
                >
                  Sign In
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
                Sign in with Google
              </Button>
            </Fieldset.Actions>

            <h4 className="mt-6 text-center text-sm text-neutral-600">
              New to BookNook?{" "}
              <span>
                <Link
                  className="text-[#ff0018] underline font-medium"
                  href={
                    targetPath && targetPath !== "/"
                      ? `/signup?callbackUrl=${encodeURIComponent(targetPath)}`
                      : "/signup"
                  }
                >
                  JOIN US
                </Link>
              </span>
            </h4>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
};

export default SignInPage;
