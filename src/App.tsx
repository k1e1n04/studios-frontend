import { Route, Routes } from "react-router-dom";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import { StudyRegisterPage } from "./pages/Study/StudyRegisterPage";
import { StudyListPage } from "./pages/Study/StudyListPage";
import { InternalServerErrorPage } from "./pages/Error/InternalServerErrorPage";
import { NotFoundPage } from "./pages/Error/NotFoundPage";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { StudyDetailPage } from "./pages/Study/StudyDetailPage";
import { StudyUpdatePage } from "./pages/Study/StudyUpdatePage";
import { TagListPage } from "./pages/Tags/TagsListPage";
import { StudiesReviewListPage } from "./pages/Study/StudiesReviewListPage.tsx";
import {
  MantineProvider,
  createTheme as mantineCreateTheme,
} from "@mantine/core";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#659CBA",
      },
      secondary: {
        main: "#F0F0F0",
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
    <div className="App">
      <ThemeProvider theme={theme}>
        <MantineProvider theme={mantineTheme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<StudyListPage />} />
            <Route path="/studies" element={<StudyListPage />} />
            <Route path="/study/create" element={<StudyRegisterPage />} />
            <Route path="/study/:id" element={<StudyDetailPage />} />
            <Route path="/study/update/:id" element={<StudyUpdatePage />} />
            <Route path="/tags" element={<TagListPage />} />
            <Route
              path={"/studies/review"}
              element={<StudiesReviewListPage />}
            />
            <Route
              path="/internal_server_error"
              element={<InternalServerErrorPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MantineProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
