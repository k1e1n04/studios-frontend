"use client";
import { Button } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

/**
 * スタイルを適用したMantineのWhiteボタン
 * @param children ボタンの中身
 * @param onClick クリックハンドラー
 * @param disabled ボタンの無効化
 */
export const StyledWhiteButton: React.FC<Props> = ({ children, onClick, disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      color="primary.0"
      style={{ margin: "0.1rem" }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
