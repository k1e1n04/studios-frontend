"use client"
import { StudyUpdateForm } from "@/organisms/Study/StudyUpdateForm";
import { Layout } from "@/templates/Layout";

/**
 * 学習更新ページ
 * @constructor
 */
export default function Page({ params }: { params: { id: string }}) {
  return (
    <Layout>
      <StudyUpdateForm id={params.id}/>
    </Layout>
  );
};
