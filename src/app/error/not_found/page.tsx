import { Alert } from "@mui/material";
import { Layout } from "@/templates/Layout";

/**
 * 404ページ
 * @constructor
 */
export default function Page() {
  return (
    <Layout>
      <Alert severity="warning">お探しのページは存在しません。</Alert>
    </Layout>
  );
};
