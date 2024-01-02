import { Button, Theme } from "@mui/material";

type Props = {
  handleSearch: () => void;
  theme: Theme;
};

/**
 * 検索ボタン
 * @param handleSearch 検索ボタンのクリックハンドラー
 * @param theme テーマ
 * @constructor
 */
export const SeachButton: React.FC<Props> = ({ handleSearch, theme }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSearch}
      sx={{ width: "100%", color: theme.palette.secondary.main }}
    >
      検索
    </Button>
  );
};
