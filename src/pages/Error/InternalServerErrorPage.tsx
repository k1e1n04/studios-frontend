import { Alert } from "@mui/material";
import { Layout } from "../../components/layouts/Layout/Layout";

export const InternalServerErrorPage: React.FC = () => {
  return (
    <Layout>
      <Alert severity="error">サーバーエラーが発生しました。</Alert>
    </Layout>
  );
};
