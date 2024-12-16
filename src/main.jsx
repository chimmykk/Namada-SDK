import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ConnectionAndSync from "./pages/settings-nav/Connection-and-sync";
import SettingMain from "./pages/settings-nav/setting-main";
import Wallet from "./pages/settings-nav/wallets/wallet-main";
import AddressBook from "./pages/settings-nav/Address-book";
import SecurityAndBackup from "./pages/settings-nav/Security-and-backup";
import Support from "./pages/settings-nav/Support";
import Privacy from "./pages/settings-nav/Privacy";
import WalletSendToken from "./pages/settings-nav/wallets/Wallet-send-token";
import Receive from "./pages/settings-nav/wallets/Receive";
import MobileSetting from "./device/mobile-device/mobile-settings/Mobile-settings";
import MobileWallet from "./device/mobile-device/mobile-wallets/Mobile-wallets";
import MainRoutes from "./routes/MainRoutes";
import MobileWalletRoutes from "./routes/mobile-routes/WalletRoutes";
import MobileMainRoutes from "./routes/mobile-routes/MobileMainRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="">
          <Route path="/" element={<App />}></Route>
          {MainRoutes()}
        </Route>

        <Route path="">{MobileMainRoutes()}</Route>

        <Route path="/mobile-wallets">
          <Route path="" element={<MobileWallet />}></Route>
          {MobileWalletRoutes()}
        </Route>

        {/* ========== Setting Section ======= */}
        <Route path="/mobile-setting" element={<MobileSetting />}></Route>

        <Route path="/setting-nav">
          <Route
            path="connection-and-sync"
            element={
              <SettingMain>
                <ConnectionAndSync />
              </SettingMain>
            }
          ></Route>

          {/* ========== Wallets ========== */}
          <Route path="wallets">
            <Route
              path=""
              element={
                <SettingMain>
                  <Wallet />
                </SettingMain>
              }
            />

            <Route
              path="receive"
              element={
                <SettingMain>
                  <Receive />
                </SettingMain>
              }
            />

            <Route
              path="send-token"
              element={
                <SettingMain>
                  <WalletSendToken />
                </SettingMain>
              }
            />
          </Route>

          {/* ========== Address Book =========== */}
          <Route
            path="address-book"
            element={
              <SettingMain>
                <AddressBook />
              </SettingMain>
            }
          ></Route>

          <Route
            path="security-and-backup"
            element={
              <SettingMain>
                <SecurityAndBackup />
              </SettingMain>
            }
          ></Route>

          <Route
            path="privacy"
            element={
              <SettingMain>
                <Privacy />
              </SettingMain>
            }
          ></Route>

          <Route
            path="support"
            element={
              <SettingMain>
                <Support />
              </SettingMain>
            }
          ></Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
