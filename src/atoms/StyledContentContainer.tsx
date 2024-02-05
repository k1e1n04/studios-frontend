import styled from "@emotion/styled";

/**
 * 独自のスタイルを適用した内容詳細表示コンテナ
 */
export const StyledContentContainer = styled.div`
  letter-spacing: 0.05rem;
  line-height: 1.5rem;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 2rem 0;
    border-bottom: 1px solid #eaecef;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.5rem 0;
    border-bottom: 1px solid #eaecef;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.25rem 0;
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0;
  }

  h5 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0.875rem 0;
  }
  
  a {
    word-break: break-all;
    color: #007bff;
  }

  .tableWrapper {
    margin: 1rem 0;
    padding: 1rem 0;
    overflow-x: auto;
    max-width: 100%;
  }

  table {
    border-collapse: collapse; /* separateからcollapseに変更し、border-spacingが適用されないようにする */
    margin: 0;
    width: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  td,
  th {
    border: 1px solid #ced4da; /* 枠線を追加してセルが区切られていることを明確にする */
    padding: 0.75rem 1rem;
    background-color: #fff;
    box-sizing: border-box;
    vertical-align: middle;
    position: relative; /* selectedCellのためのpositioningの基準点を作る */
  }

  th {
    background-color: #f9fafb;
    color: #1c7ed6;
    font-weight: 600;
    text-align: left;
  }

  code {
    background-color: rgb(247, 248, 249);
    color: #333;
    padding: 0 5px;
    border-radius: 8px;
    display: inline-block;
  }

  .selectedCell::after {
    background: rgba(200, 200, 255, 0.4);
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    z-index: 2;
  }

  .column-resize-handle {
    background-color: #1c7ed6;
    bottom: 0; /* はみ出さないように調整 */
    position: absolute;
    right: 0; /* はみ出さないように調整 */
    width: 4px;
    height: 100%; /* handleの高さをセルの高さに合わせる */
    cursor: col-resize; /* リサイズ可能であることを示すカーソルに変更 */
  }
  
  ul, ol {
    padding-left: 20px;
  }

  ul li {
    list-style-type: disc;
    list-style-position: inherit;
  }

  ol li {
    list-style-type: decimal;
    list-style-position: inherit;
  }
`;
