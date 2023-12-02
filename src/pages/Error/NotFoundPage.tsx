import { Alert } from "@mui/material";
import { Layout } from "../../components/layouts/Layout/Layout";

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Alert severity="warning">お探しのページは存在しません。</Alert>
    </Layout>
  );
};
