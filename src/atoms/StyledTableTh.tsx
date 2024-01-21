import styled from "@emotion/styled";
import { Table } from "@mantine/core";

/**
 * スタイルを適用したMUIのテーブルセル
 */
export const StyledTableTh = styled(Table.Th)`
  overflow: hidden;
  textoverflow: ellipsis;
  whitespace: nowrap;

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 0.8rem;
  }
`;
