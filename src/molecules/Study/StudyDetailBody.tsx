type Props = {
  content: string;
};

/**
 * 詳細の内容
 * @param content 内容
 * @constructor
 */
export const StudyDetailBody: React.FC<Props> = ({ content }) => {
  return (
    <div
      className="markdown"
      style={{ marginTop: "20px" }}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
