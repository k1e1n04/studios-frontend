import { StudyRegisterForm } from "@/organisms/Study/StudyRegisterForm";
import { Layout } from "@/templates/Layout";

/**
 * 学習登録ページ
 * @constructor
 */
export const Register: React.FC = () => {
  return (
    <Layout>
      <StudyRegisterForm />
    </Layout>
  );
};
