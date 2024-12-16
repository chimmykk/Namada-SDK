import { useState, useRef, useEffect } from "react";
import AccountList from "./Account-list";
import Receive from "./Receive";
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

  // Show Account list handler
  const showAccountHandler = (value) => {
    setShowAccountList(value);
  };

  return (
    <>
      {activeLayout === "main" && (
        <div className="flex flex-col justify-between gap-4 items-center pb-[1.5rem] max-w-fit xsm:min-w-[35rem] xxsm:w-full">
          <div className="flex items-center justify-between w-full gap-8 xxsm:gap-2">
            <div
              onMouseEnter={() => setShowAccountList(true)}
              onMouseLeave={() => setShowAccountList(false)}
              className="bg-[#2a2a2a] py-[1.2rem] px-[2.4rem] text-[1.8rem] cursor-pointer rounded-md hover:bg-[#3b3b3b] relative left-0"
              style={{ transition: "all 0.3s ease" }}
            >
              {activeAccount.name} <span>▾</span>
              {showAccountList && (
                <AccountList
                  showAccountHandler={showAccountHandler}
                  activeAccount={activeAccountHandler}
                />
              )}
            </div>

            <p className="text-[1.2rem] bg-[#ffc800] text-black py-[.5rem] px-[1rem] rounded-full xxsm:text-[1rem] xxsm:font-semibold">
              SYNCHRONIZED
            </p>
          </div>

          <div className="flex items-start w-full gap-3">
            <span className="px-2 text-[1.6rem]" ref={addressValue}>
              {activeAccount.address}
            </span>

            <img
              className="h-[2.4rem] cursor-pointer"
              src="https://img.icons8.com/ios-glyphs/30/clipboard.png"
              alt="Copy Address"
              onClick={copyAddressHandler}
            ></img>
          </div>

          <div className="mt-[2rem] p-[1.5rem] bg-[#3a3a3a] rounded-md w-full text-center">
            <label className="text-[1.8rem]">Available Balance</label>
            <p className="text-[2.4rem] font-bold mt-[1rem]">
              ${activeAccount.balance}
            </p>
          </div>

          {/* Button Layout */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <Link
              to={"/setting-nav/wallets/recieve"}
              className="bg-[#ffc800] text-black text-center py-[1rem] px-[2.5rem] rounded-md text-[1.6rem] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Recieve
            </Link>

            <Link
              to={"/setting-nav/wallets/send-token"}
              className="bg-[#ffc800] text-center text-black py-[1rem] px-[2.5rem] rounded-md text-[1.6rem] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Send
            </Link>

            <button
              className="bg-[#ffc800] text-black py-[1rem] px-[2.5rem] rounded-md text-[1.6rem] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
              style={{ transition: "all 0.3s ease" }}
            >
              Buy
            </button>

            <button
              className="bg-[#ffc800] text-black py-[1rem] px-[2.5rem] rounded-md text-[1.6rem] hover:translate-y-[-2px] hover:bg-[#c69f03] w-full"
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
