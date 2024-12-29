import { useState, useEffect } from "react";

const AccountList = ({ activeAccount, showAccountHandler }) => {
  const [active, setActive] = useState();
  const [account, setAccount] = useState([]);

  // Fetch the account data
  useEffect(() => {
    fetch("/api/account.json")
      .then((res) => res.json())
      .then((data) => setAccount(data))
      .catch((err) => alert("Can't fetch the data", err));
  }, []);

  const clickHandler = (item) => {
    setActive(item.name);
    activeAccount(item);
  };

  // To display the account list
  const accountDisplay = account.map((item) => {
    return (
      <div
        key={item.name}
        onClick={() => {
          clickHandler(item);
          showAccountHandler(false);
        }}
        className={`${
          active === item.name ? "outline outline-1" : ""
        } grid grid-cols-2 w-[25rem] py-[.5rem] bg-primary hover:bg-[#444] p-3 gap-0 rounded-md xxsm:w-[23rem]`}
      >
        <span className="">{item.name}</span>
        <p className="row-span-2  self-center justify-self-end font-bold">
          $ {item.balance}
        </p>
        <p className="text-secondary>{item.address}</p>
      </div>
    );
  });

  return (
    <div className="bg-secondary p-4 absolute flex flex-col gap-2  left-0 rounded-lg xxsm:w-fit">
      {accountDisplay}

      <div className="w-full p-2 hover:bg-primary rounded-md">
        <button
          className="bg-secondary text-black p-2 rounded-md hover:bg-[#c69f03] w-full"
          style={{ transition: "all 0.3s ease" }}
        >
          + Add Wallet
        </button>
      </div>
    </div>
  );
};

export default AccountList;
