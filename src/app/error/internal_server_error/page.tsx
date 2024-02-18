"use client";
import { Alert } from "@mantine/core";
import {NoAuthLayout} from "@/templates/NoAuthLayout";

/**
 * サーバーエラーページ
 * @constructor
 */
export default function Page() {
  return (
    <NoAuthLayout>
      <Alert color="red">サーバーエラーが発生しました。</Alert>
    </NoAuthLayout>
  );
}
