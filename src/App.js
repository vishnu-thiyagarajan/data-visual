import LandingPage from "components/Page/LandingPage";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@mui/styles";
import theme from "theme";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </DndProvider>
  );
}

export default App;
