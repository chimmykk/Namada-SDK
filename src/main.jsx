import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CreateNewWallet from "./pages/Create-new-wallet";
import RestoreWallet from "./pages/Restore-wallet";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/create-new-wallet" element={<CreateNewWallet />}></Route>
        <Route path="/restore-wallet" element={<RestoreWallet />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
