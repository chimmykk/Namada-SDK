import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Receive = () => {
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
    <>
      <div className="bg-primary p-[20px] rounded-lg mb-[10px] flex flex-col items-center relative w-full">
        <h2 className="text-[24px] mb-[20px] text-left text-[#f0f4f8] font-medium w-full">
          Receive
        </h2>
        <div className="w-[150px] h-[150px] p-2 bg-[#fff] flex items-center justify-center rounded-lg ">
          <img
            className="w-full"
            src={
              addressType == "Segwit"
                ? "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:bc1qf6zfy4we300vjx3fn0dnwwtjg33f0uvha8c4de&size=150x150"
                : "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:zs1p4vexampleaddressshieldedzksnarks&size=150x150"
            }
          />
        </div>
      </div>

      <div className="mt-[10px] text-center">
        <label>Address Type:</label>
        <select
          onChange={(e) => addressTypeHandler(e)}
          className="w-full rounded-md my-[10px] bg-[#1e1e1e] text-white p-3 focus:outline focus:outline-1 focus:outline-[#57a6ff] focus:bg-[#1f2942]"
          style={{
            boxShadow: "0 1px 2px #ffc800",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <option value={"Segwit"}>Transparent (Segwit)</option>
          <option value={"ZK"}>Shielded (ZK)</option>
        </select>
      </div>

      <p
        ref={addressRef}
        className="mt-[20px] break-words text-[12px] text-center"
      >
        {addressType == "Segwit"
          ? "bc1qf6zfy4we300vjx3fn0dnwwtjg33f0uvha8c4de"
          : "zs1p4vexampleaddressshieldedzksnarks"}
      </p>

      <button
        onClick={CopyAddressHandler}
        className="w-full rounded-md bg-secondary text-[#1e1e1e] font-medium cursor-pointer tracking-wide p-[10px] mt-[20px] hover:bg-[#285dcc]"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        COPY ADDRESS
      </button>
    </>
  );
};

export default Receive;
