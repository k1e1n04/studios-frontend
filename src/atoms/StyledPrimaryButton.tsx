import { Button } from "@mantine/core";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};
/**
 * スタイルを適用したMantineのプライマリーボタン
 */
export const StyledPrimaryButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      color="primary.0"
      variant="filled"
      style={{ margin: "0.1rem" }}
    >
      {children}
    </Button>
  );
};
