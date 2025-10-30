import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "./Views/Index";
import Stats from "./Views/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pokemon/:id" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
