import CreateNewWallet from "../pages/Create-new-wallet";
import RestoreWallet from "../pages/Restore-wallet";
import CreateWallet from "../pages/Create-wallet";
import VerifyWord from "../pages/Verify-word";
import NewPage from "../pages/New-Page";
import WalletList from "../pages/Wallet-list";
import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/dashboard/Settings";
import HelpAndSupport from "../pages/dashboard/Help-and-support";
import ImportWalletTold from "../pages/Import-wallet-told";
import ReceiveToken from "../pages/Receive-token";
import SendToken from "../pages/Send-token";

import { Route } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Route path="">
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
      <Route path="/receive-token" element={<ReceiveToken />} />
      <Route path="/send-token" element={<SendToken />} />
    </Route>
  );
};

export default MainRoutes;
