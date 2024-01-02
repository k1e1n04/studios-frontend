import { Button } from "@mui/material";

type Props = {
  tag: string;
};

/**
 * MUIのタグボタン
 * @param tag タグ
 */
export const TagButton: React.FC<Props> = ({ tag }) => {
  return (
    <Button
      key={tag}
      variant="outlined"
      sx={{
        m: 1,
      }}
      href={`/?tags=${tag}`}
    >
      {tag}
    </Button>
  );
};
