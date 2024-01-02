import { Alert } from "@mui/material";
import { Layout } from "../../templates/Layout.tsx";

/**
 * サーバーエラーページ
 * @constructor
 */
export const InternalServerErrorPage: React.FC = () => {
  return (
    <Layout>
      <Alert severity="error">サーバーエラーが発生しました。</Alert>
    </Layout>
  );
};
