import { Alert } from "@mui/material";
import { Layout } from "@/templates/Layout";

/**
 * 404ページ
 * @constructor
 */
export const Not_found: React.FC = () => {
  return (
    <Layout>
      <Alert severity="warning">お探しのページは存在しません。</Alert>
    </Layout>
  );
};
