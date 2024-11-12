import { useState, useEffect } from "react";

import BackButton from "../components/ui/backButton";
import StepIndicator from "../components/ui/step-indicator";
import ButtonNotAllow from "../components/ui/button-not-allow";

const VerifyWord = () => {
  const [inputWordEight, setInputWordEight] = useState("");
  const [inputWordOne, setInputWordOne] = useState("");
  const [buttonAllow, setButtonAllow] = useState(false);

  useEffect(() => {
    inputWordEight.length > 0 && inputWordOne.length > 0
      ? setButtonAllow(true)
      : setButtonAllow(false);
  }, [inputWordEight, inputWordOne]);

  return (
    <div
      className="w-full max-w-[400px] bg-[#2a2a2a] rounded-lg p-[20px] relative"
      style={{ boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)" }}
    >
      <BackButton />

      <div className="my-[15px] w-full flex justify-center">
        <StepIndicator activeNumber={2} />
      </div>

      <h2 className="text-white text-[1.4rem] text-center font-medium">
        Verify your seed phrase
      </h2>

      <p className="text-[14px] my-[20px] text-center text-[#ccc]">
        Fill out the words according to their numbers
      </p>

      <section>
        <label className="text-[14px] mb-[5px] block">Word #8</label>
        <input
          onChange={(e) => setInputWordEight(e.target.value)}
          className="w-full bg-black text-white rounded-md p-[10px]"
        ></input>

        <label className="text-[14px] mt-[10px] block ">Word #1</label>
        <input
          onChange={(e) => setInputWordOne(e.target.value)}
          className="w-full bg-black text-white rounded-md p-[10px]"
        ></input>

        <div className="mt-[20px]">
          <ButtonNotAllow title={"Next"} allow={buttonAllow} />
        </div>
      </section>
    </div>
  );
};

export default VerifyWord;
