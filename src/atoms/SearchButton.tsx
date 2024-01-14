import { Button } from "@mantine/core";

type Props = {
  handleSearch?: () => void;
};

/**
 * Mantineの検索ボタン
 * @param handleSearch 検索ボタンのクリックハンドラー
 * @constructor
 */
export const SearchButton: React.FC<Props> = ({ handleSearch }) => {
  return (
    <Button
      onClick={handleSearch}
      color="primary.0"
      variant="filled"
      style={{ backgroundColor: "#659CBA" }}
    >
      検索
    </Button>
  );
};
