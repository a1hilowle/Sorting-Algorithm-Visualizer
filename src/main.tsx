import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AlgoContext from "./components/utils/AlgoContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><AlgoContext><App /></AlgoContext></React.StrictMode>
);
