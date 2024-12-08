import SideBar from "../../components/layout/Side-bar";
import SettingDashboardList from "./component/SettingDashboardList";
import { useState } from "react";

const Settings = () => {
  // Get the value of toggle button
  function EnableButton(value, id) {
    console.log("The value of ", id, "is ", value);
  }

  const settingList = {
    wallet: {
      title: "Wallet Settings",
      list: [
        "Enable Wallet Backup",
        "Enable Multi-Signature",
        "Show Wallet Balance",
      ],
    },

    connection: {
      title: "Connection Settings",
      list: ["Enable Sync", "Use Proxy"],
    },

    security: {
      title: "Security Settings",
      list: ["Enable 2FA"],
    },

    privacy: {
      title: "Privacy Settings",
      list: ["Anonymous Mode"],
    },

    display: {
      title: "Display Settings",
      list: ["Dark Mode"],
    },

    other: {
      title: "Other Settings",
      list: ["Enable Notification"],
    },
  };

  return (
    <div className="flex justify-between items-start max-w-[80rem]  bg-primary rounded-lg w-[90%] p-[2rem] xxsm:p-[0rem] shadow-custom-shadow  h-[auto] ">
      <SideBar currActive={"settings"} />

      <section className="bg-[#2a2a2a] rounded-lg max-w-[48rem] w-full p-[1rem] shadow-custom-shadow m-[1rem] ">
        <div
          className="max-w-[50rem] w-full h-full p-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-[2.4rem] font-medium ">Settings</h1>
            <p className="bg-secondary text-black px-2 rounded-full text-[1.2rem]">
              SYNCHRONIZED
            </p>
          </div>

          <section className=" w-full border-1 border-[#555] rounded-md p-3 flex flex-col gap-4 mt-4 overflow-y-auto xxsm:max-h-[60rem]">
            <SettingDashboardList
              prop={settingList.wallet}
              EnableButton={EnableButton}
            />

            <SettingDashboardList
              prop={settingList.connection}
              EnableButton={EnableButton}
            />

            <SettingDashboardList
              prop={settingList.security}
              EnableButton={EnableButton}
            />

            <SettingDashboardList
              prop={settingList.privacy}
              EnableButton={EnableButton}
            />

            <SettingDashboardList
              prop={settingList.display}
              EnableButton={EnableButton}
            />

            <SettingDashboardList
              prop={settingList.other}
              EnableButton={EnableButton}
            />
          </section>
        </div>
      </section>
    </div>
  );
};

export default Settings;
