'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import {
    createTheme as mantineCreateTheme, MantineProvider,
} from "@mantine/core";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

const theme = createTheme();

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
            "ocean-blue": [
                "#7AD1DD",
                "#5FCCDB",
                "#44CADC",
                "#2AC9DE",
                "#1AC2D9",
                "#11B7CD",
                "#09ADC3",
                "#0E99AC",
                "#128797",
                "#147885",
            ],
        },
    });
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <MantineProvider theme={mantineTheme}>
                    {children}
                </MantineProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export default ThemeRegistry;