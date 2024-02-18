"use client";
import { StudyUpdateForm } from "@/organisms/Study/StudyUpdateForm";
import {AuthRequiredLayout} from "@/templates/AuthRequiredLayout";

/**
 * 学習更新ページ
 * @constructor
 */
export default function Page({ params }: { params: { id: string } }) {
  return (
    <AuthRequiredLayout>
      <StudyUpdateForm id={params.id} />
    </AuthRequiredLayout>
  );
}
