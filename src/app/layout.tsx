import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/code-highlight/styles.css";
import ThemeRegistry from "@/registry";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studyo",
  description:
    "Studyoは、日々の学びを「Study」として記録し、創造性を育む「Studio」の役割を担います。 学習の一歩一歩を記録することで、自分自身の成長を実感し、新たな可能性に挑戦する勇気を与えてくれます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>Studyo</title>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
