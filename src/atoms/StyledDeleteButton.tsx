import { Button } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

/**
 * スタイルを適用したMantineの削除ボタン
 */
export const StyledDeleteButton: React.FC<Props> = ({ children, onClick, disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      color="delete.0"
      disabled={disabled}
      style={{ margin: "0.1rem" }}
    >
      {children}
    </Button>
  );
};
