"use client";
import * as React from "react";
import { MantineProvider } from "@mantine/core";
import ThemeRegistry from "@/registry";
import { createTheme as mantineCreateTheme } from "@mantine/core";
import {AuthLayout} from "@/templates/AuthLayout";

type Props = {
  children: React.ReactNode;
};

export const AuthRequiredLayout: React.FC<Props> = ({ children }) => {
  const mantineTheme = mantineCreateTheme({
    colors: {
      primary: [
        "#659CBA",
        "#507C94",
        "#F5F5F5",
        "#2AC9DE",
        "#1AC2D9",
        "#11B7CD",
        "#09ADC3",
        "#0E99AC",
        "#128797",
        "#147885",
      ],
      delete: [
        "#F06060",
        "#D64C4C",
        "#C03838",
        "#A62424",
        "#8E1010",
        "#7A0000",
        "#660000",
        "#520000",
        "#3E0000",
        "#2A0000",
      ],
    },
  });

  return (
    <MantineProvider theme={mantineTheme}>
      <ThemeRegistry>
        <AuthLayout>
            {children}
        </AuthLayout>
      </ThemeRegistry>
    </MantineProvider>
  );
};
