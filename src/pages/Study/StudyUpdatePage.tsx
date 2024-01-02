import { StudyUpdateForm } from "../../organisms/Study/StudyUpdateForm.tsx";
import { Layout } from "../../templates/Layout.tsx";

/**
 * 学習更新ページ
 * @constructor
 */
export const StudyUpdatePage: React.FC = () => {
  return (
    <Layout>
      <StudyUpdateForm />
    </Layout>
  );
};
