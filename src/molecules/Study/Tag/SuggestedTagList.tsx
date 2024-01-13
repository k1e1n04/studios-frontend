import { StyledWhiteButton } from "@/atoms/StyledWhiteButton";

type Props = {
  suggestedTags: string[];
  handleAddTag: (tag: string) => void;
  setSuggestedTags: (tags: string[]) => void;
};

/**
 * サジェッションタグリスト
 * @param suggestedTags サジェッションタグリスト
 * @param handleAddTag タグ追加ボタンのクリックハンドラー
 * @param setSuggestedTags サジェッションタグリストのセッター
 * @constructor
 */
export const SuggestedTagList: React.FC<Props> = ({
  suggestedTags,
  handleAddTag,
  setSuggestedTags,
}) => {
  return (
    <div>
      {suggestedTags.map((tag, index) => (
        <StyledWhiteButton
          key={index}
          onClick={() => {
            handleAddTag(tag);
            setSuggestedTags([]);
          }}
        >
          {tag}
        </StyledWhiteButton>
      ))}
    </div>
  );
};
