import { Container } from "@mantine/core";
import styled from "@emotion/styled";

/**
 * スタイルを適用したコンテナ
 */
export const StyledContainer = styled(Container)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 5%;
  background-color: #fff;
  border-radius: 10px;

  .markdown table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid rgb(204, 204, 204);
  }

  .markdown th {
    border: 1px solid rgb(204, 204, 204);
    padding: 5px;
  }

  .markdown td {
    border: 1px solid rgb(204, 204, 204);
    padding: 5px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 4%;
  }

  @media (max-width: 767px) {
    padding: 3%;
  }
`;
