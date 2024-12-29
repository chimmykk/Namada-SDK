import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import MainRoutes from "./routes/MainRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>{MainRoutes()}</Router>
  </React.StrictMode>
);
