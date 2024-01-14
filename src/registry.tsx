"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { RecoilRoot } from "recoil";

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

  return (
    <RecoilRoot>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </RecoilRoot>
  );
};

export default ThemeRegistry;
