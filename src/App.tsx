import { Route, Routes } from "react-router-dom";
import "./App.css";
import { StudyRegisterPage } from "./pages/Study/StudyRegisterPage";
import { StudyListPage } from "./pages/Study/StudyListPage";
import { InternalServerErrorPage } from "./pages/Error/InternalServerErrorPage";
import { NotFoundPage } from "./pages/Error/NotFoundPage";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { StudyDetailPage } from "./pages/Study/StudyDetailPage";
import { StudyUpdatePage } from "./pages/Study/StudyUpdatePage";
import { TagListPage } from "./pages/Tags/TagsListPage";

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
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<StudyListPage />} />
          <Route path="/studies" element={<StudyListPage />} />
          <Route path="/study/create" element={<StudyRegisterPage />} />
          <Route path="/study/:id" element={<StudyDetailPage />} />
          <Route path="/study/update/:id" element={<StudyUpdatePage />} />
          <Route path="/tags" element={<TagListPage />} />
          <Route
            path="/internal_server_error"
            element={<InternalServerErrorPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
