import { Button } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

/**
 * スタイルを適用したMantineの削除ボタン
 */
export const StyledDeleteButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="filled"
      color="delete.0"
      style={{ margin: "0.1rem", backgroundColor: "#f06060" }}
    >
      {children}
    </Button>
  );
};
