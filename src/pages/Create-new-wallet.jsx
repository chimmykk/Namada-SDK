import { useState } from "react";
import Button2 from "../components/ui/button2";
import BackButton from "../components/ui/backButton";
import StepIndicator from "../components/ui/step-indicator";
import Input from "../components/ui/input";

const CreateNewWallet = () => {
  const [active, setActive] = useState(12);

  const wordsHandler = (words) => {
    let list = [];

    for (let i = 1; i <= words; i++) {
      list.push(<Input key={i} placeholder={i} />);
    }

    return list;
  };

  return (
    <div
      className="bg-[#2a2a2a] w-[full] max-w-[400px] rounded-[15px] p-[20px] flex flex-col gap-2 items-center justify-center"
      style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)" }}
    >
      <BackButton />
      <StepIndicator />
      <h2 className="font-bold"> New Seed Phrase</h2>

      <div className="flex gap-2">
        <button
          className="bg-[#ffc800] hover:bg-[#c69f03] hover:outline hover:outline-2 hover:outline-black text-black text-[16px] px-[15px] py-[5px] rounded-[5px] active:scale-95 duration-200"
          style={{
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
          onClick={() => setActive(12)}
        >
          12 words
        </button>

        <button
          className="bg-[#ffc800] hover:bg-[#c69f03] hover:outline hover:outline-2 hover:outline-black text-black text-[16px] px-[15px] py-[5px] rounded-[5px] active:scale-95 duration-200"
          style={{
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
          onClick={() => setActive(24)}
        >
          24 words
        </button>
      </div>

      <div className="grid grid-cols-4 gap-[10px] mb-[20px] mt-[20px]">
        {wordsHandler(active)}
      </div>

      <a className="text-[#ffc800] hover:text-[#c69f03] hover:underline cursor-pointer text-[14px]">
        Copy to Clipboard
      </a>

      <div className="bg-[#333] p-[15px] rounded-md text-[12px]  text-center">
        <div>
          <p className="text-[#ffc800] font-medium text-[14px]">
            DO NOT share your seed phrase with ANYONE
          </p>
          <p className="text-[12px]">
            Anyone with your seed phrase can have full control over your assets.
            Stay vigilant against phishing attacks at all times.
          </p>
        </div>

        <div className="mt-[20px] mb-[20px]">
          <p className="text-[#ffc800] font-medium text-[14px]">
            Back up the phrase safely
          </p>
          <p className="text-[12px]">
            You will never be able to restore your account without your seed
            phrase.
          </p>
        </div>
      </div>

      <button className="bg-[#ffc800] cursor-not-allowed opacity-50 p-[15px] w-full rounded-md text-black text-[14px] mt-[20px]">
        Next
      </button>
    </div>
  );
};

export default CreateNewWallet;
