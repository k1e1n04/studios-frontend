import { StyledTableRow } from "@/atoms/StyledTableRow";
import { Table } from "@mantine/core";
import { StyledTableTh } from "@/atoms/StyledTableTh";

/**
 * 学習一覧テーブルのヘッダー
 */
export const StudiesTableHead: React.FC = () => {
  return (
      <Table.Thead style={{ backgroundColor: "#659cba", color: "white"}}>
        <Table.Tr>
          <StyledTableTh style={{ width: "60px"}}>
          </StyledTableTh>
          <StyledTableTh style={{ width: "300px" }}>
            タイトル
          </StyledTableTh>
          <StyledTableTh style={{ width: "150px" }}>
            タグ
          </StyledTableTh>
          <StyledTableTh style={{ width: "100px" }}>
            復習回数
          </StyledTableTh>
          <StyledTableTh style={{ width: "120x" }}>
            作成日
          </StyledTableTh>
          <StyledTableTh style={{ width: "120px" }}>
            更新日
          </StyledTableTh>
        </Table.Tr>
      </Table.Thead>
  );
};
