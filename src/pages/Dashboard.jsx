import SideBar from "../components/layout/Side-bar";

const Dashboard = () => {
  return (
    <div className="flex w-[90%] max-w-[800px] rounded-lg overflow-hidden shadow-custom-shadow bg-[#2a2a2a]">
      <SideBar currActive={"wallet"} />

      <section className="bg-[#2a2a2a] rounded-lg max-w-[600px] w-full p-[20px] shadow-custom-shadow m-[10px]">
        <div className="flex items-center justify-between ">
          <h1 className="font-medium">My Account</h1>
          <p className="bg-secondary text-black px-2 rounded-full text-[10px]">
            SYNCHRONIZED
          </p>
        </div>

        <div className="bg-[#3a3a3a] px-4 py-2 rounded-md mt-[40px]">
          <p className="text-[18px]">Available Balance</p>
          <p className="text-[24px] font-medium">0.00 NAM</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-[16px]">
          <button
            className="bg-secondary text-black p-1 rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
            style={{ transition: "all 0.3s ease" }}
          >
            Recieve
          </button>

          <button
            className="bg-secondary text-black p-1 rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
            style={{ transition: "all 0.3s ease" }}
          >
            Send
          </button>
          <button
            className="bg-secondary text-black p-1 rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
            style={{ transition: "all 0.3s ease" }}
          >
            Buy
          </button>

          <button
            className="bg-secondary text-black p-1 rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
            style={{ transition: "all 0.3s ease" }}
          >
            Sell
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
