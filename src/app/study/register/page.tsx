"use client";
import { StudyRegisterForm } from "@/organisms/Study/StudyRegisterForm";
import { Layout } from "@/templates/Layout";

/**
 * 学習登録ページ
 * @constructor
 */
export default function Page() {
  return (
    <Layout>
      <StudyRegisterForm />
    </Layout>
  );
}
