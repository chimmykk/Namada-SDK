import { Link } from "react-router-dom";
import { use, useState, useEffect } from "react";
import LeftIcon from "../assets/icons/arrow-left";
import DownAchorIcon from "../assets/icons/down-achor";
import UpAnchorIcon from "../assets/icons/up-anchor";
import ScanIcon from "../assets/icons/scan";

const transferTypeList = ["IBC", "Shielded", "Transparent"];

function SendToken() {
  const [transferType, setTransferType] = useState("");
  const [changeTypeShow, setChangeTypeShow] = useState(false);

  /* ------------ Chanage the transfer type handler ------------*/
  const changeTypeHandler = (value) => {
    if (value !== undefined) {
      setTransferType(value);
    }
    setChangeTypeShow(!changeTypeShow);
  };

  const showHandler = () => {
    setChangeTypeShow(!changeTypeShow);
  };

  useEffect(() => {
    setTransferType("IBC");
  }, []);

  return (
    <div
      className="bg-primary p-[4rem] w-[38rem] rounded-lg hover:translate-y-[-5px] md:max-w-[40rem] xsm:w-[90%] xxsm:h-full xsm:h-fit xxsm:w-full xxsm:p-8 flex flex-col gap-2"
      style={{
        boxShadow: "0 1rem 2.5 #ffc800",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Link
        to={"/mobile/wallet"}
        className="xxsm:block xsm:hidden pb-8 flex justify-between"
      >
        <LeftIcon color={"currentColor"} />
      </Link>

      <div className="text-[1.4rem] text-right text-[#14d60b] mb-[1rem]">
        ● SYNCHRONIZED
      </div>
      <h2 className="text-[2.8rem] mb-[2.5rem] text-start text-primary font-medium xxsm:text-[2.4rem]">
        Send Token
      </h2>

      {/* ------------ Iput Recipient Address Layout ------------*/}
      <div className="w-full flex justify-center items-center gap-4 rounded-md outline outline-1 pr-4">
        <input
          type="text"
          placeholder="Recipient Address"
          className="w-full rounded-md bg-primary text-primary text-[1.6rem] focus:outline-none  focus:border-[#57a6ff] focus:border focus:bg-[#e4e4e4] focus:dark:bg-[#1f2942] p-4 "
          style={{ transition: "all 0.3s ease-in-out" }}
        ></input>
        <ScanIcon w={24} color={"currentColor"} />
      </div>

      {/* ------------ Input NAM & USD Layout ------------*/}
      <div className="flex gap-8 w-full">
        <input
          type="number"
          className="p-[1rem] my-[1rem] rounded-md bg-primary text-[1.6rem] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#e4e4e4]  focus:dark:bg-[#1f2942] w-full outline outline-1"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="NAM: 0.0000"
        ></input>
        <input
          type="number"
          className="p-[1rem] my-[1rem] rounded-md bg-primary text-[1.6rem] focus:outline-none focus:border focus:bg-[#e4e4e4] focus:border-[#57a6ff] focus:dark:bg-[#1f2942] w-full outline outline-1"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="USD: 0.00"
        ></input>
      </div>

      {/* ------------ Available Balance Layout ------------*/}
      <p className="text-[1.8rem] text-secondary">Available Balance: 0.0 NAM</p>

      {/* ------------- Input Note Optional Layout ------------- */}
      <div>
        <input
          type="text"
          placeholder="Note (optional)"
          className="w-full rounded-md bg-primary text-[1.6rem] focus:outline-none  focus:border-[#57a6ff] focus:border focus:bg-[#e4e4e4] focus:dark:bg-[#1f2942] p-4 border mt-20 text-primary"
          style={{ transition: "all 0.3s ease-in-out" }}
        ></input>
      </div>

      {/* ------------ Estimated Fee Layout ------------*/}
      <div className="flex justify-between mt-[1.5rem] mb-20">
        <p className="text-secondary text-[1.4rem]">Estimated fee:</p>
        <p className="text-secondary text-[1.4rem]">0.0 NAM | 0.00 USD</p>
      </div>

      {/* ------------ Select the transfer type Layout ------------*/}
      <div onClick={showHandler} className="flex gap-3">
        <label className="text-secondary text-[1.4rem]">Transfer Type</label>
        <div
          className=" flex  p-4 w-full bg-[#f0f0f0] dark:bg-[#424242] rounded-xl relative"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <p className=" w-full h-full mt-auto">{transferType}</p>
          {changeTypeShow ? (
            <UpAnchorIcon w={24} color={"currentColor"} />
          ) : (
            <DownAchorIcon w={24} color={"currentColor"} />
          )}

          {changeTypeShow ? (
            <div className="w-full absolute top-[5rem] right-0 rounded-xl bg-[#f0f0f0] dark:bg-[#424242]">
              {transferTypeList.map((item) => {
                return (
                  <button
                    key={item}
                    className={`p-4 block w-full text-start ${
                      transferType === item
                        ? "bg-[#d3d3d3] dark:bg-[#636363] rounded-xl"
                        : ""
                    }`}
                    onClick={() => changeTypeHandler(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <p className="mt-[1.5rem] text-[1.4rem] text-[#6e82a5] cursor-pointer text-right">
        Coin Control (optional)
      </p>

      {/* ------------ Send Button ------------*/}
      <button
        className="bg-[#ffc800] text-[#080303] font-semibold w-full uppercase p-[1rem] rounded-lg  hover:bg-[#cc9b00] mt-auto"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        Send
      </button>
    </div>
  );
}

export default SendToken;
