import { StudyDetailPage } from "@/pages/Study/StudyDetailPage";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import {redirect} from "next/navigation";
import { views } from "@/constants/views";
import { useStudy } from "@/hooks/SSR/useStudy";
import {cookies} from "next/headers";

/**
 * 学習詳細ページ
 * @constructor
 */
export default async function Page({ params }: { params: { id: string } }) {
  const { fetchStudy } = useStudy();
  const data: StudyResponseDto = await fetchStudy(params.id);
  if (data === null) {
    redirect(views.STUDY_LIST.path);
  }
  return <StudyDetailPage data={data} />;
}
