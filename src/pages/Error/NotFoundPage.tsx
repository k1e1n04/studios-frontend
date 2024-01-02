import { Alert } from "@mui/material";
import { Layout } from "../../templates/Layout.tsx";

/**
 * 404ページ
 * @constructor
 */
export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Alert severity="warning">お探しのページは存在しません。</Alert>
    </Layout>
  );
};
