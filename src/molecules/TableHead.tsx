import { Table } from "@mantine/core";
import { StyledTableTh } from "@/atoms/StyledTableTh";

type Props = {
  headList: {
    headName: string;
    width: string;
  }[];
};

/**
 * テーブルのヘッダー
 */
export const TableHead: React.FC<Props> = ({ headList }) => {
  return (
    <Table.Thead style={{ backgroundColor: "#659cba", color: "white" }}>
      <Table.Tr>
        {headList.map((head) => (
          <StyledTableTh style={{ width: head.width }} key={head.headName}>
            {head.headName}
          </StyledTableTh>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};
