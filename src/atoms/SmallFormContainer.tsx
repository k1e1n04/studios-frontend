import styled from "styled-components";
import { Container } from "@mantine/core";

/**
 * 小さいフォーム用のコンテナ
 * 例: ログインフォーム
 */
export const SmallFormContainer = styled(Container)`
  max-width: 500px;
  margin: 0 auto;
  padding: 15% 5% 5% 5%;
  background-color: #fff;
  border-radius: 10px;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 30% 6% 6% 6%;
  }

  @media (max-width: 767px) {
    padding: 40% 5% 5% 5%;
  }
`;
