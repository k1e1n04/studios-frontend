"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { RecoilRoot } from "recoil";
import {Suspense} from "react";

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
        <ThemeProvider theme={theme}>
          <Suspense>
            {children}
          </Suspense>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </RecoilRoot>
  );
};

export default ThemeRegistry;
