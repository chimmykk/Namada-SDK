import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CreateNewWallet from "./pages/Create-new-wallet";
import RestoreWallet from "./pages/Restore-wallet";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateWallet from "./pages/Create-wallet";
import NewPage from "./pages/New-Page";
import VerifyWord from "./pages/Verify-word";
import WalletList from "./pages/Wallet-list";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/dashboard/Settings";
import HelpAndSupport from "./pages/dashboard/Help-and-support";
import ImportWalletTold from "./pages/Import-wallet-told";
import RecieveToken from "./pages/Recieve-token";
import SendToken from "./pages/Send-token";
import ConnectionAndSync from "./pages/settings-nav/Connection-and-sync";
import SettingMain from "./pages/settings-nav/setting-main";
import Wallet from "./pages/settings-nav/wallets/wallet-main";
import AddressBook from "./pages/settings-nav/Address-book";
import SecurityAndBackup from "./pages/settings-nav/Security-and-backup";
import Support from "./pages/settings-nav/Support";
import Privacy from "./pages/settings-nav/Privacy";
import Receive from "./pages/settings-nav/wallets/Recieve";
import WalletSendToken from "./pages/settings-nav/wallets/Wallet-send-token";
import NewWallet from "./pages/dashboard/NewWallet";
import NewSettings from "./pages/New-settings";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-new-wallet" element={<CreateNewWallet />} />
        <Route path="/restore-wallet" element={<RestoreWallet />} />
        <Route path="/create-wallet" element={<CreateWallet />} />
        <Route path="/verify-word" element={<VerifyWord />} />
        <Route path="/new-page" element={<NewPage />} />
        <Route path="/wallet-list" element={<WalletList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-and-support" element={<HelpAndSupport />} />
        <Route path="/import-wallet-told" element={<ImportWalletTold />} />
        <Route path="/recieve-token" element={<RecieveToken />} />
        <Route path="/send-token" element={<SendToken />} />

        {/* ========== Setting Section ======= */}
        <Route path="/new-wallets" element={<NewWallet />}></Route>
        <Route path="/new-settings" element={<NewSettings />}></Route>

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
              path="recieve"
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
