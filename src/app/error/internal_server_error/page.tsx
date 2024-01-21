"use client";
import { Alert } from "@mantine/core";
import { Layout } from "@/templates/Layout";

/**
 * サーバーエラーページ
 * @constructor
 */
export default function Page() {
  return (
    <Layout>
      <Alert color="red">サーバーエラーが発生しました。</Alert>
    </Layout>
  );
}
