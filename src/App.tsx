import React from "react";
import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import Desktop from "./pages/Desktop";
import Apps from "./pages/Apps";

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Desktop />} />
        <Route path="/apps" element={<Apps />} />
      </Routes>
    </div>
  );
}

export default App;
