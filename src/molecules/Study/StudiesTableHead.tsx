import { TableHead, TableRow } from "@mui/material";
import { StyledTableCell } from "../../atoms/StyledTableCell.tsx";
import { useTheme } from "@mui/material/styles";

/**
 * 学習一覧テーブルのヘッダー
 */
export const StudiesTableHead: React.FC = () => {
  const theme = useTheme();
  return (
    <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
      <TableRow>
        <StyledTableCell
          sx={{ color: theme.palette.secondary.main, width: "60px" }}
        ></StyledTableCell>
        <StyledTableCell sx={{ color: theme.palette.secondary.main }}>
          タイトル
        </StyledTableCell>
        <StyledTableCell
          sx={{ color: theme.palette.secondary.main, width: "150px" }}
        >
          タグ
        </StyledTableCell>
        <StyledTableCell
          sx={{ color: theme.palette.secondary.main, width: "100px" }}
        >
          復習回数
        </StyledTableCell>
        <StyledTableCell
          sx={{ color: theme.palette.secondary.main, width: "120px" }}
          align="right"
        >
          作成日
        </StyledTableCell>
        <StyledTableCell
          sx={{ color: theme.palette.secondary.main, width: "120px" }}
          align="right"
        >
          更新日
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
};
