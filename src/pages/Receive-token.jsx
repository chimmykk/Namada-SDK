import { useState, useRef } from "react";

const ReceiveToken = () => {
  const [addressType, setAddressType] = useState("Segwit");
  const addressRef = useRef(null);

  // Change the Address Type
  const addressTypeHandler = (e) => {
    const value = e.target.value;
    setAddressType(value);
  };

  // Copy the Address
  function CopyAddressHandler() {
    const textValue = addressRef.current.textContent;

    if (textValue)
      navigator.clipboard
        .writeText(textValue)
        .then(alert("Address copied to clipboard"))
        .catch((err) => console.log(err));
  }

  return (
    <div
      className="bg-primary p-[4rem] rounded-lg w-[40rem] shadow-custom-shadow hover:translate-y-[-5px] xxsm:w-[90%] md:max-w-[40rem] xsm:max-w-[40rem] xxsm:p-[2rem]"
      style={{ transition: "all 0.3s ease-in-out" }}
    >
      <header className="flex justify-between items-center mb-[2rem]">
        <div className="flex items-center">
          <span className="text-[1.8rem] text-[#ffbf00]">🪙</span>
          <span className="ml-[1.8rem] font-[2rem]">fghj</span>
        </div>
        <p className="text-[#57a6ff] text-[1.2rem]">SYNCHRONIZED</p>
      </header>

      <div className="bg-primary p-[2rem] rounded-lg mb-[1.2rem] flex flex-col items-center">
        <h2 className="text-[2.8rem] mb-[1.2rem] text-center text-[#f0f4f8] font-medium">
          Receive
        </h2>

        <div className="w-[15rem] h-[15rem] bg-[#fff] flex items-center justify-center rounded-lg">
          <img
            className="w-[90%]"
            src={
              addressType == "Segwit"
                ? "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:bc1qf6zfy4we300vjx3fn0dnwwtjg33f0uvha8c4de&size=150x150"
                : "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:zs1p4vexampleaddressshieldedzksnarks&size=150x150"
            }
          />
        </div>
      </div>

      <div className="mt-[2rem] text-center">
        <label>Address Type:</label>
        <select
          onChange={(e) => addressTypeHandler(e)}
          className="w-full rounded-md my-[1rem] bg-[#1e1e1e] text-white p-3 focus:outline focus:outline-1 focus:outline-[#57a6ff] focus:bg-[#1f2942]"
          style={{
            boxShadow: "0 0.1rem 0.2rem #ffc800",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <option value={"Segwit"}>Transparent (Segwit)</option>
          <option value={"ZK"}>Shielded (ZK)</option>
        </select>
      </div>

      <p
        ref={addressRef}
        className="mt-[2rem] break-words text-[1.4rem] text-center text-[#aaa]"
      >
        {addressType == "Segwit"
          ? "bc1qf6zfy4we300vjx3fn0dnwwtjg33f0uvha8c4de"
          : "zs1p4vexampleaddressshieldedzksnarks"}
      </p>

      <button
        onClick={CopyAddressHandler}
        className="w-full rounded-md bg-secondary text-[#1e1e1e] font-medium cursor-pointer tracking-wide p-[1rem] mt-[2rem] hover:bg-[#285dcc]"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        COPY ADDRESS
      </button>
    </div>
  );
};

export default ReceiveToken;
