import styled from "styled-components";
import { TableCell } from "@mui/material";

/**
 * スタイルを適用したMUIのテーブルセル
 */
export const StyledTableCell = styled(TableCell)`
  overflow: hidden;
  textoverflow: ellipsis;
  whitespace: nowrap;

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 0.8rem;
  }
`;
