"use client";
import { Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import styled from "@emotion/styled";

const _StyledWhiteButton = styled(Button)`
  margin: 0.1rem;
  color: #659cba;
  border-color: #659cba;
  background-color: white;
  &:hover {
    background-color: #659cba;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:disabled:hover {
    background-color: white;
    color: #659cba;
  }
`;

/**
 * スタイルを適用したMantineのWhiteボタン
 */
export const StyledWhiteButton = createPolymorphicComponent<
  "button",
  ButtonProps
>(_StyledWhiteButton);
