import styled from "styled-components";
import { Button } from "@mui/material";

/**
 * スタイルを適用したMUIの更新ボタン
 */
export const StyledUpdateButton = styled(Button)`
  background-color: #659cba;
  color: white;

  &:hover {
    background-color: #74a6c1;
    color: white;
  }
`;
