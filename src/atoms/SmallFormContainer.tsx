import styled from "styled-components";
import { Container } from "@mantine/core";

/**
 * 小さいフォーム用のコンテナ
 * 例: ログインフォーム
 */
export const SmallFormContainer = styled(Container)`
  max-width: 500px;
  margin: 100px auto;
  padding: 7%;
  background-color: #fff;
  border-radius: 10px;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 6%;
  }

  @media (max-width: 767px) {
    padding: 5%;
  }
`;