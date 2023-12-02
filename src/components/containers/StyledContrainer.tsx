import { Container } from "@mui/material";
import styled from "styled-components";
import { grey } from "@mui/material/colors";

export const StyledContainer = styled(Container)`
  max-width: 1000px;
  margin: 0 auto;
  max-width: 1000px; // 最大幅を設定
  padding: 5%;
  background-color: #fff;
  border-radius: 10px;

  .markdown table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid ${grey[300]};
  }

  .markdown th {
    border: 1px solid ${grey[300]};
    padding: 5px;
  }

  .markdown td {
    border: 1px solid ${grey[300]};
    padding: 5px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 4%;
  }

  @media (max-width: 767px) {
    padding: 3%;
  }
`;
