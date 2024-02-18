"use client";
import { StudyRegisterForm } from "@/organisms/Study/StudyRegisterForm";
import {AuthRequiredLayout} from "@/templates/AuthRequiredLayout";

/**
 * 学習登録ページ
 * @constructor
 */
export default function Page() {
  return (
    <AuthRequiredLayout>
      <StudyRegisterForm />
    </AuthRequiredLayout>
  );
}
