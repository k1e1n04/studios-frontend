import { CodeHighlight } from "@mantine/code-highlight";
import { StyledContentContainer } from "@/atoms/StyledContentContainer";
import React, { useCallback } from "react";

type Props = {
  content: string;
};

/**
 * 詳細の内容
 * @param content 内容
 * @constructor
 */
export const StudyDetailBody: React.FC<Props> = ({ content }) => {
  /**
   * コードブロックをレンダリング
   */
  const renderCodeBlocks = useCallback(() => {
    // 正規表現を使用して <pre><code> タグを検出
    const regex =
      /<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g;

    // content を分割して各部分を処理
    return content.split(regex).map((part, index) => {
      // 1. コードブロック前のテキスト
      // 2. コードブロックの言語名
      // 3. コードブロックの中身
      // 偶数インデックスは通常のテキスト、奇数インデックスはコードブロック
      if (index % 3 === 0) {
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        );
      } else if (index % 3 === 1) {
        // 言語名を取得 (例: language-ts -> ts)
        return (
          <CodeHighlight
            key={index}
            code={content.split(regex)[index + 1]}
            withCopyButton
            copiedLabel="Copied!"
            language={part}
            style={{ margin: "10px 0" }}
          />
        );
      }
      return null;
    });
  }, [content]);

  return (
    <StyledContentContainer
      className="study-detail-body"
      style={{ marginTop: "20px" }}
    >
      {renderCodeBlocks()}
    </StyledContentContainer>
  );
};
