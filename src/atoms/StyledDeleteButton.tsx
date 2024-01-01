import styled from "styled-components";
import {Button} from "@mui/material";

/**
 * スタイルを適用したMUIの削除ボタン
 */
export const StyledDeleteButton = styled(Button)`
  background-color: #f06060;
  color: white;

  &:hover {
    background-color: #fabebb;
  }
`;