import { useState } from "react";

import BackButton from "../components/ui/backButton";
import Input2 from "../components/ui/input2";

const RestoreWallet = () => {
  const [active, setActive] = useState(12);
  const [validNext, setValidNext] = useState(false);
  const [privateInput, setPrivateInput] = useState();

  const ActiveFunction = (cActive) => {
    const list = [];
    for (let i = 1; i <= cActive; i++) {
      list.push(<Input2 key={i} placeholder={i} />);
    }

    return list;
  };

  // Private Input Handler
  const privateInputHandler = (e) => {
    const newValue = e.target.value;

    setPrivateInput(newValue);

    setValidNext(newValue.length >= 1);
  };

  return (
    <div className="flex justify-between max-w-[600px] flex-col bg-[#1e1e1e] p-[20px] rounded-lg w-[80%] gap-[20px]">
      <div className="flex">
        <BackButton />
        <p className="font-normal m-auto text-[1.5rem]">Import Existing Keys</p>
      </div>

      <div className="flex flex-col text-center">
        <p className="text-[0.8rem]">
          • Enter your seed phrase in the right order without capitalization,
          punctuation symbols, or spaces.
        </p>
        <p className="text-[0.8rem]">• Or copy and paste your entire phrase.</p>
      </div>

      {/* Button Section */}
      <div className="flex gap-3">
        <button
          className={`${
            active == 12
              ? "bg-[#ffc800] hover:bg-[#ffc800] text-black"
              : "bg-[#333] hover:bg-[#c69f03]"
          } w-full rounded-full p-[10px]`}
          onClick={() => {
            setActive(12);
            setValidNext(false);
          }}
          style={{ transition: "all 0.3s ease" }}
        >
          12 words
        </button>

        <button
          className={`${
            active == 24
              ? "bg-[#ffc800] hover:bg-[#ffc800] text-black"
              : "bg-[#333] hover:bg-[#c69f03]"
          } w-full rounded-full p-[10px]`}
          onClick={() => {
            setActive(24);
            setValidNext(false);
          }}
          style={{ transition: "all 0.3s ease" }}
        >
          24 words
        </button>

        <button
          className={`${
            active == "Private Key"
              ? "bg-[#ffc800] hover:bg-[#ffc800] text-black"
              : "bg-[#333] hover:bg-[#c69f03]"
          } w-full rounded-full p-[10px]`}
          style={{ transition: "all 0.3s ease" }}
          onClick={() => {
            setValidNext(false);
            setActive("Private Key");
          }}
        >
          Private Key
        </button>
      </div>

      {/* Layout 12 words */}
      {active == 12 && (
        <div className="grid grid-cols-3 gap-4">{ActiveFunction(active)}</div>
      )}

      {/* Layout 24 words */}
      {active == 24 && (
        <div className="grid grid-cols-4 gap-4">{ActiveFunction(active)}</div>
      )}

      {/* Layout Private Key */}
      {active == "Private Key" && (
        <input
          type="text"
          className="p-[10px] bg-[#333] border-2 border-[#555] rounded-lg text-white text-center text-[1rem] w-full"
          placeholder="Enter your private key"
          onChange={(e) => privateInputHandler(e)}
        ></input>
      )}

      <button
        className="text-center text-[#ffc800] hover:text-[#c69f00] hover:underline cursor-pointer font-[1rem]"
        style={{ transition: "all 0.3s ease" }}
      >
        Import with BIP39 Passphrase
      </button>

      <button
        className={`${
          validNext ? "cursor-pointer bg-[#ffc800]" : "cursor-not-allowed"
        } bg-[#c69f03] cursor-not-allowed p-[10px] rounded-lg text-black`}
      >
        Next
      </button>
    </div>
  );
};

export default RestoreWallet;
