import { useState, useRef, useEffect } from "react";
import AccountList from "./Account-list";
import Receive from "./Recieve";
import { Link } from "react-router-dom";

function Wallet() {
  const addressValue = useRef();
  const [showAccountList, setShowAccountList] = useState(false);
  const [activeAccount, setActiveAccount] = useState([]);
  const [activeLayout, setActiveLayout] = useState("main");

  // fetch the account data
  useEffect(() => {
    fetch("/api/account.json")
      .then((res) => res.json())
      .then((data) => setActiveAccount(data[0]));
  }, []);

  // Active layout Hanlder
  const activeLayoutHandler = (value) => {
    setActiveLayout(value);
  };

  // Active account Handler
  const activeAccountHandler = (active) => {
    setActiveAccount(active);
  };

  // Copy the address
  const copyAddressHandler = () => {
    if (addressValue.current) {
      navigator.clipboard
        .writeText(addressValue.current.textContent)
        .then(() => alert("Copied the address !"))
        .catch((err) => alert("Fail to copy"));
    }
  };

  return (
    <>
      {activeLayout === "main" && (
        <div className="flex flex-col justify-between gap-4 items-center pb-[15px] max-w-[400px] min-w-[350px]">
          <div className="flex items-center justify-center gap-8">
            <div
              onMouseEnter={() => setShowAccountList(true)}
              onMouseLeave={() => setShowAccountList(false)}
              className="bg-[#2a2a2a] py-[12px] px-[24px] text-[18px] cursor-pointer rounded-md hover:bg-[#3b3b3b] relative left-0"
              style={{ transition: "all 0.3s ease" }}
            >
              {activeAccount.name} <span>▾</span>
              {showAccountList && (
                <AccountList activeAccount={activeAccountHandler} />
              )}
            </div>

            <p className="text-[12px] bg-[#ffc800] text-black py-[5px] px-[10px] rounded-full">
              SYNCHRONIZED
            </p>
          </div>

          <div className="flex items-start w-full gap-3">
            <span className="px-2 text-[16px]" ref={addressValue}>
              {activeAccount.address}
            </span>

            <img
              className="h-[24px] cursor-pointer"
              src="https://img.icons8.com/ios-glyphs/30/clipboard.png"
              alt="Copy Address"
              onClick={copyAddressHandler}
            ></img>
          </div>

          <div className="mt-[20px] p-[15px] bg-[#3a3a3a] rounded-md w-full text-center">
            <label className="text-[18px]">Available Balance</label>
            <p className="text-[24px] font-bold mt-[10px]">
              ${activeAccount.balance}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Link
              to={"/setting-nav/wallets/recieve"}
              className="bg-[#ffc800] text-black text-center py-[10px] px-[25px] rounded-md text-[16px] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Recieve
            </Link>

            <Link
              to={"/setting-nav/wallets/send-token"}
              className="bg-[#ffc800] text-center text-black py-[10px] px-[25px] rounded-md text-[16px] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Send
            </Link>

            <button
              className="bg-[#ffc800] text-black py-[10px] px-[25px] rounded-md text-[16px] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Buy
            </button>

            <button
              className="bg-[#ffc800] text-black py-[10px] px-[25px] rounded-md text-[16px] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Sell
            </button>
          </div>
        </div>
      )}
      {activeLayout === "Recieve" && <Receive />}
    </>
  );
}

export default Wallet;
