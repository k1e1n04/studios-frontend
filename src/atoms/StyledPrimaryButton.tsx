import {Button, ButtonProps, createPolymorphicComponent} from "@mantine/core";
import React from "react";
import styled from "@emotion/styled";

const _StyledPrimaryButton = styled(Button)`
    margin: 0.1rem;
    background-color: #659cba;
    &:hover {
        background-color: #659cba;
    }
    &:disabled {
        opacity: 0.5;
    }
    &:disabled:hover {
        background-color: #659cba;
    }
    `;

/**
 * スタイルを適用したMantineのプライマリーボタン
 */
export const StyledPrimaryButton = createPolymorphicComponent<'button', ButtonProps>(_StyledPrimaryButton);