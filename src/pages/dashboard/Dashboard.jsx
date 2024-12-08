import SideBar from "../../components/layout/Side-bar";
import Wallet from "./Wallet";

const Dashboard = () => {
  return (
    <div className="flex md:w-[auto] xxsm:w-[90%] max-w-[auto] rounded-lg overflow-hidden shadow-custom-shadow bg-[#2a2a2a]">
      <SideBar currActive={"wallet"} />

      <Wallet />
    </div>
  );
};

export default Dashboard;
