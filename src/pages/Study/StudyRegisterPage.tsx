import { StudyRegisterForm } from "../../organisms/Study/StudyRegisterForm.tsx";
import { Layout } from "../../templates/Layout.tsx";

/**
 * 学習登録ページ
 * @constructor
 */
export const StudyRegisterPage: React.FC = () => {
  return (
    <Layout>
      <StudyRegisterForm />
    </Layout>
  );
};
