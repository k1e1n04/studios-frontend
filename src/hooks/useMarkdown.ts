import Prism from "prismjs";
import { marked } from 'marked';

export const useMarkdown = () => {

  const generateMarkdownPreview = (markdown: string) => {
    // markedを使ってマークダウンをHTMLに変換
    const html = marked(markdown);

    // 仮想DOMに変換してPrismでハイライト
    const tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = html;
    Prism.highlightAllUnder(tmpDiv);

    // ハイライトされたHTMLを返す
    return Promise.resolve(tmpDiv.innerHTML);
  };

  return { generateMarkdownPreview } as const;
};
