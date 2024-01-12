"use client";
import { Alert } from "@mui/material";
import { Layout } from "@/templates/Layout";

/**
 * サーバーエラーページ
 * @constructor
 */
export default function Page() {
  return (
    <Layout>
      <Alert severity="error">サーバーエラーが発生しました。</Alert>
    </Layout>
  );
}
