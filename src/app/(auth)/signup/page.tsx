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
import { signIn, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
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
        console.log("Signup error");
      } else {
        console.log("Signup succesed");
      }
    } catch {
      console.log("signup has an error");
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
              Join BookNook
            </Fieldset.Legend>
            <Description className="text-[#1a1a1a]">
              Signup with your credentials, to join the reader community
            </Description>
            <Fieldset.Group>
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
                  } catch (_) {
                    return "Please enter a valid image URL";
                    console.log(_)
                  }
                }}
              >
                <Label>Profile Image</Label>
                <Input placeholder="https://example.com/image.jpg" />
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
                <Input placeholder="Enter your password" />
                <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
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
                <SiGoogle className="text-[#ff5b49]" />
                Sign in with Google
              </Button>
            </Fieldset.Actions>
            <h4>
              Already a member?{" "}
              <span>
                <Link className="text-[#ff0018] underline" href="/signin">
                  Sign In
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
