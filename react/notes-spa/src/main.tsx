// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import Home from './pages/Home';
// import About from './pages/About';
import "./index.css";

// Create a root and render the application inside a strict mode wrapper
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* Set up routing using BrowserRouter */}
    <BrowserRouter>
      <Routes>
        {/* Root route wraps all child routes */}
        <Route path="/" element={<App />}>
          {/* Index route: rendered at the base path '/' */}
          {/* <Route index element={<Home />} /> */}
          {/* '/about' route for the About page */}
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
