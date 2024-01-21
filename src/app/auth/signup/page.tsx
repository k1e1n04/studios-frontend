"use client";
import { NoAuthLayout } from "@/templates/NoAuthLayout";
import { SignupForm } from "@/organisms/Auth/SignupForm";

export default function Page() {
  return (
    <NoAuthLayout>
      <SignupForm />
    </NoAuthLayout>
  );
}
