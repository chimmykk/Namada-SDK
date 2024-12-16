import { useState } from "react";
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
      className="bg-[#2a2a2a] w-[full] max-w-[40rem] relative rounded-[1.5rem] md:rounded-xl p-[2rem] flex flex-col gap-2 items-center justify-center xxsm:w-[90%]"
      style={{ boxShadow: "0px 1rem 2rem rgba(0, 0, 0, 0.5)" }}
    >
      <BackButton />
      <StepIndicator activeNumber={1} />
      <h2 className="font-bold mt-10"> New Seed Phrase</h2>

      <div className="flex gap-8">
        <button
          className="bg-[#ffc800] hover:bg-[#c69f03] hover:outline hover:outline-2 hover:outline-black text-black text-[1.6rem] px-[1.5rem] py-[0.5rem] rounded-[0.5rem] active:scale-95 duration-200"
          style={{
            boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
          onClick={() => setActive(12)}
        >
          12 words
        </button>

        <button
          className="bg-[#ffc800] hover:bg-[#c69f03] hover:outline hover:outline-2 hover:outline-black text-black text-[1.6rem] px-[1.2rem] py-[0.5rem] rounded-[0.5rem] active:scale-95 duration-200"
          style={{
            boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
          onClick={() => setActive(24)}
        >
          24 words
        </button>
      </div>

      <div className="grid grid-cols-4 gap-[1rem] mb-[2rem] mt-[2rem]">
        {wordsHandler(active)}
      </div>

      <a className="text-[#ffc800] hover:text-[#c69f03] hover:underline cursor-pointer text-[1.4rem]">
        Copy to Clipboard
      </a>

      <div className="bg-[#333] p-[1.5rem] rounded-xl text-[1.2rem]  text-center">
        <div>
          <p className="text-[#ffc800] font-medium text-[1.4rem]">
            DO NOT share your seed phrase with ANYONE
          </p>
          <p className="text-[1.2rem]">
            Anyone with your seed phrase can have full control over your assets.
            Stay vigilant against phishing attacks at all times.
          </p>
        </div>

        <div className="mt-[2rem] mb-[2rem]">
          <p className="text-[#ffc800] font-medium text-[1.4rem]">
            Back up the phrase safely
          </p>
          <p className="text-[1.2rem]">
            You will never be able to restore your account without your seed
            phrase.
          </p>
        </div>
      </div>

      <button className="bg-[#ffc800] cursor-not-allowed opacity-50 p-[1rem] w-full rounded-xl text-black text-[1.8rem] mt-[2rem]">
        Next
      </button>
    </div>
  );
};

export default CreateNewWallet;
