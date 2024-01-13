"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import {
  createTheme as mantineCreateTheme,
  MantineProvider,
} from "@mantine/core";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#659CBA",
      },
      secondary: {
        main: "#F5F5F5",
      },
    },
  });
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
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemeRegistry;
