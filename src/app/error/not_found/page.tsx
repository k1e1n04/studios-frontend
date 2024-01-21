"use client";
import { Alert } from "@mantine/core";
import { Layout } from "@/templates/Layout";

/**
 * 404ページ
 * @constructor
 */
export default function Page() {
  return (
    <Layout>
      <Alert color="yellow">お探しのページは存在しません。</Alert>
    </Layout>
  );
}
