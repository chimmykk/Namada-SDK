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
      className="w-full max-w-[40rem] bg-[#2a2a2a] rounded-lg p-[2rem] relative xxsm:w-[90%]"
      style={{ boxShadow: "0rem 1rem 2rem rgba(0, 0, 0, 0.5)" }}
    >
      <BackButton />

      <div className="my-[1.5rem] w-full flex justify-center">
        <StepIndicator activeNumber={2} />
      </div>

      <h2 className="text-white text-[1.8rem] text-center font-medium">
        Verify your seed phrase
      </h2>

      <p className="text-[1.4rem] my-[2rem] text-center text-[#ccc]">
        Fill out the words according to their numbers
      </p>

      <section className="flex flex-col gap-2">
        <label className="text-[1.4rem] mb-[0.5rem] block">Word #8</label>
        <input
          onChange={(e) => setInputWordEight(e.target.value)}
          className="w-full bg-black text-white rounded-md p-[1rem]"
        ></input>

        <label className="text-[1.4rem] mt-[1rem] block ">Word #1</label>
        <input
          onChange={(e) => setInputWordOne(e.target.value)}
          className="w-full bg-black text-white rounded-md p-[1rem]"
        ></input>

        <div className="mt-[4rem]">
          <ButtonNotAllow title={"Next"} allow={buttonAllow} />
        </div>
      </section>
    </div>
  );
};

export default VerifyWord;
