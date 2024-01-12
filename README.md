# standard-nextjs-serverless

Next.js を用いたサーバーレスアプリケーションの標準リポジトリです。

- standard-echo-serverless
- standard-cdk-serverless

を用いて開発する際に使用します。

## 技術要素

| 項目       | バージョン |
| ---------- | ---------- |
| Node.js    | 20.8.1     |
| npm        | 10.1.0     |
| Next.js    | 13.5.6     |
| React      | 18         |
| TypeScript | 5          |
| Tailwind   | 3.0.0      |
| react-dom  | 18         |

## 環境構築

### アプリケーションの初期化

```bash
npm install
```

### ローカルサーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)でアクセスできます。

## ビルド

```bash
npm run build
```

## デプロイ

Amplify に従う。
コンソールからはブランチベースでデプロイすることができる。
タグを用いる場合は GitHub Actions 等の CI/CD ツールを用いる。
