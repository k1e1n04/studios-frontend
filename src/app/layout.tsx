import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/code-highlight/styles.css";
import ThemeRegistry from "@/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studios",
  description: "Studios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
