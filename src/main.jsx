import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
     <BrowserRouter basename="">  {/* Adjust the basename if necessary */}
    <App />
    </BrowserRouter>
);
