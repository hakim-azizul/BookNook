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
} from "@heroui/react";
import { SiGoogle } from "react-icons/si";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
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
        console.log("sign in failed");
      } else {
        console.log("sign in successful");
      }
    } catch {
      console.log("signin error try again");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
      });
      if (error) {
        console.log("google signin error");
      } else {
        console.log("google signin successful");
      }
    } catch {
      console.log("google signin error");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
      <Surface className="w-full max-w-xl min-w-95 p-30 rounded-3xl bg-[#f4f6f0]">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="text-rose-500 text-2xl">
              Welcome Back
            </Fieldset.Legend>
            <Description className="text-[#1a1a1a]">
              Read continuously, Share insights, Grow community.
            </Description>
            <Fieldset.Group>
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
                    return "Password must be at least 8 characters";
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
            <Fieldset.Actions>
              <Button className="bg-[#1a1a1a]" type="submit">
                Sign In
              </Button>
              <Button type="reset" variant="tertiary">
                Cancel
              </Button>
              <Button
                onPress={handleGoogleSignIn}
                className="w-full border border-[#a1a1] hover:border-[#ff5b49]"
                variant="tertiary"
              >
                <SiGoogle className="text-[#ff5b49]"/>
                Sign in with Google
              </Button>
            </Fieldset.Actions>
            <h4>
              New to BookNook?{" "}
              <span>
                <Link className="text-[#ff0018] underline" href="/signup">
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
