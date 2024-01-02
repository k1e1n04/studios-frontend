type Props = {
  convertedContent: string;
};

/**
 * 詳細の内容
 * @param convertedContent 変換済みの内容
 * @constructor
 */
export const StudyDetailBody: React.FC<Props> = ({ convertedContent }) => {
  return (
    <div
      className="markdown"
      style={{ marginTop: "20px" }}
      dangerouslySetInnerHTML={{
        __html: convertedContent,
      }}
    />
  );
};
