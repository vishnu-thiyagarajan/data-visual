import LandingPage from "components/LandingPage";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LandingPage />
    </DndProvider>
  );
}

export default App;
