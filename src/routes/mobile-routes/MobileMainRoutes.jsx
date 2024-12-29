import { Route } from "react-router-dom";

import MobileSettingRoute from "./MobileSettingRoutes";
import MobileWalletRoutes from "./WalletRoutes";

const MobileMainRoutes = () => {
  return (
    <>
      <Route path="" element={<p> Home Page of Mobile Device </p>}></Route>
      <Route path="wallet">{MobileWalletRoutes()}</Route>
      <Route path="setting">{MobileSettingRoute()}</Route>
    </>
  );
};

export default MobileMainRoutes;
