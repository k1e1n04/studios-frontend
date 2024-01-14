"use client";
import {Button, ButtonProps, createPolymorphicComponent} from "@mantine/core";
import styled from '@emotion/styled';

const _StyledWhiteButton = styled(Button)`
    margin: 0.1rem;
    color: #659CBA;
    border-color: #659CBA;
    background-color: white;
    &:hover {
        background-color: #659CBA;
        color: white;
    }
  
    &:disabled {
        opacity: 0.5;
    }
  
    &:disabled:hover {
        background-color: white;
        color: #659CBA;
    }
`;

/**
 * スタイルを適用したMantineのWhiteボタン
 */
export const StyledWhiteButton = createPolymorphicComponent<'button', ButtonProps>(_StyledWhiteButton);