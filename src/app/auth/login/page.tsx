"use client";
import { LoginForm } from "@/organisms/Auth/LoginForm";
import { NoAuthLayout } from "@/templates/NoAuthLayout";

export default function Page() {
  return (
    <NoAuthLayout>
      <LoginForm />
    </NoAuthLayout>
  );
}
