import { StudyUpdateForm } from "@/organisms/Study/StudyUpdateForm";
import { Layout } from "@/templates/Layout";

/**
 * 学習更新ページ
 * @constructor
 */
export const Update: React.FC = () => {
  return (
    <Layout>
      <StudyUpdateForm />
    </Layout>
  );
};
