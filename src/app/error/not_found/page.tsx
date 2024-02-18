"use client";
import { Alert } from "@mantine/core";
import { AuthLayout } from "@/templates/AuthLayout";
import {NoAuthLayout} from "@/templates/NoAuthLayout";

/**
 * 404ページ
 * @constructor
 */
export default function Page() {
  return (
    <NoAuthLayout>
      <Alert color="yellow">お探しのページは存在しません。</Alert>
    </NoAuthLayout>
  );
}