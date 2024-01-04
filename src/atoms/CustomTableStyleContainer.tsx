import styled from "styled-components";

/**
 * 独自のスタイルを適用したテーブルコンテナ
 */
export const CustomTableStyleContainer = styled.div`
  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
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
`;
