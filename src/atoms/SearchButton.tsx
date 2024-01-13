import { Button } from '@mantine/core';

type Props = {
  handleSearch?: () => void;
};

/**
 * 検索ボタン
 * @param handleSearch 検索ボタンのクリックハンドラー
 * @constructor
 */
export const SeachButton: React.FC<Props> = ({ handleSearch}) => {
  return (
    <Button
      onClick={handleSearch}
      color="primary.0"
      variant="filled"
    >
      検索
    </Button>
  );
};
