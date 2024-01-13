import { StyledWhiteButton } from "@/atoms/StyledWhiteButton";
import React from "react";
import Link from "next/link";

type Props = {
  tag: string;
};

/**
 * タグボタン
 * NOTE: タグボタンはタグのリンクを提供する
 * @param tag タグ
 */
export const TagButton: React.FC<Props> = ({ tag }) => {
  return (
    <StyledWhiteButton key={tag}>
      <Link href={`/study/list/?tags=${tag}`}>{tag}</Link>
    </StyledWhiteButton>
  );
};
