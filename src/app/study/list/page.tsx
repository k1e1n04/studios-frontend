import { useStudy } from "@/hooks/SSR/useStudy";
import {StudyListPage} from "@/pages/Study/StudyListPage";
import {ReadonlyURLSearchParams} from "next/navigation";

/**
 * 学習一覧ページ
 * @constructorx
 */
export default async function Page({searchParams}: {
  searchParams: { tags: string | undefined, title: string | undefined, page: string | undefined }
}) {
  const { fetchStudies } = useStudy();
  const queryTags = searchParams.tags === undefined ? "" : searchParams.tags;
  const queryTitle = searchParams.title === undefined ? "" : searchParams.title;
  const queryPageNumber = searchParams.page === undefined ? 1 : parseInt(searchParams.page);

  const limit = 10;

  const studiesResponseDtos = await fetchStudies(
      queryTags === null ? "" : queryTags,
      queryTitle === null ? "" : queryTitle,
      queryPageNumber,
      limit,
  );
  return (
     <StudyListPage data={studiesResponseDtos} queryTags={queryTags} queryTitle={queryTitle} />
  );
}
