import SideBar from "../components/layout/Side-bar";
import Toggle from "../components/ui/toggle";

const Settings = () => {
  // Get the value of toggle button
  function EnableButton(value, id) {
    console.log("The value of ", id, "is ", value);
  }

  return (
    <div className="flex justify-between items-start max-w-[800px]  bg-primary rounded-lg w-[90%] p-[20px] shadow-custom-shadow  h-[90vh]">
      <SideBar currActive={"Settings"} />

      <div className="max-w-[600px] w-full overflow-y-scroll h-full p-4">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[24px] font-medium">Settings</h1>
          <p className="bg-secondary text-black px-2 rounded-full text-[10px]">
            SYNCHRONIZED
          </p>
        </div>

        <section className="border w-full border-1 border-[#555] rounded-md mt-2 p-3 flex flex-col gap-4">
          <div>
            <p
              className="text-[20px] py-[10px] text-[#ffc800]"
              style={{ borderBottom: "1px solid #555" }}
            >
              Wallet Settings
            </p>

            <div className="flex gap-4 mt-6 flex-col">
              <div className="flex gap-4">
                <label>Enable Wallet Backup</label>
                <Toggle getValue={EnableButton} id={"Wallet Backup"} />
              </div>

              <div className="flex gap-4">
                <label>Enable Multi-Signature</label>
                <Toggle getValue={EnableButton} id={"Multi Signature"} />
              </div>

              <div className="flex gap-4">
                <label>Show Wallet Balance</label>
                <Toggle getValue={EnableButton} id={"Wallet Balance"} />
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[20px] py-[10px] text-[#ffc800]"
              style={{ borderBottom: "1px solid #555" }}
            >
              Connection Settings
            </p>

            <div className="flex gap-4 mt-6 flex-col">
              <div className="flex gap-4">
                <label>Enable Sync</label>
                <Toggle getValue={EnableButton} id={"Sync"} />
              </div>

              <div className="flex gap-4">
                <label>Use Proxy</label>
                <Toggle getValue={EnableButton} id={"Proxy"} />
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[20px] py-[10px] text-[#ffc800]"
              style={{ borderBottom: "1px solid #555" }}
            >
              Security Settings
            </p>

            <div className="flex gap-4 mt-6 flex-col">
              <div className="flex gap-4">
                <label>Enable 2FA</label>
                <Toggle getValue={EnableButton} id={"2FA"} />
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[20px] py-[10px] text-[#ffc800]"
              style={{ borderBottom: "1px solid #555" }}
            >
              Privacy Settings
            </p>

            <div className="flex gap-4 mt-6 flex-col">
              <div className="flex gap-4">
                <label>Anonymous Mode</label>
                <Toggle getValue={EnableButton} id={"Anonymous"} />
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[20px] py-[10px] text-[#ffc800]"
              style={{ borderBottom: "1px solid #555" }}
            >
              Display Settings
            </p>

            <div className="flex gap-4 mt-6 flex-col">
              <div className="flex gap-4">
                <label>Dark Mode</label>
                <Toggle getValue={EnableButton} id={"Dark"} />
              </div>
            </div>
          </div>

          <div>
            <p
              className="text-[20px] py-[10px] text-[#ffc800]"
              style={{ borderBottom: "1px solid #555" }}
            >
              Other Settings
            </p>

            <div className="flex gap-4 mt-6 flex-col">
              <div className="flex gap-4">
                <label>Enable Notification</label>
                <Toggle getValue={EnableButton} id={"Notification"} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
