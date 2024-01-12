import { Alert } from "@mui/material";
import { Layout } from "@/templates/Layout";

/**
 * サーバーエラーページ
 * @constructor
 */
export const Internal_server_error: React.FC = () => {
  return (
    <Layout>
      <Alert severity="error">サーバーエラーが発生しました。</Alert>
    </Layout>
  );
};
