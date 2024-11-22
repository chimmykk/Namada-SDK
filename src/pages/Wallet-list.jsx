import { useRef } from "react";

import BackButton from "../components/ui/backButton";
import ButtonNotAllow from "../components/ui/button-not-allow";
import StepIndicator from "../components/ui/step-indicator";

const WalletList = () => {
  const transparentAddress = useRef("tnam1qrtshzyauy...k8mz9j");
  const publicKey = useRef("tpknam1qzzv9svn9lrke...n8l6fz");
  const shieldedAddress = useRef("znam1p2wvuaz27r7g20r...mhjwu");

  const copyHandler = (value) => {
    navigator.clipboard
      .writeText(value.current)
      .then(() => alert(`${value.current} copied to clipboard.`))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="max-w-[40rem]  p-[2rem] bg-primary rounded-lg shadow-custom-shadow relative xxsm:w-[90%]">
      <div className="flex justify-center my-[2rem]">
        <StepIndicator activeNumber={5} />
      </div>

      <BackButton link={"/new-page"} />
      <h2 className="text-center font-medium text-[2.4rem] mt-[2rem]">
        Namada Keys Created
      </h2>
      <p className="text-center text-[#aaa] mb-[2rem]">
        Here are the accounts generated from your keys
      </p>

      <div>
        <div className="relative">
          <label className="block mb-[0.5rem] text-[#ccc] text-[1.4rem]">
            Your Transparent Address
          </label>
          <input
            readOnly
            value={"tnam1qrtshzyauy...k8mz9j"}
            className="w-full p-[1rem] text-[1.4rem] text-black bg-secondary rounded-lg"
          ></input>

          <img
            onClick={() => copyHandler(transparentAddress)}
            width="30"
            height="30"
            className="cursor-pointer absolute top-0 right-3 translate-y-[50%] mt-[1.5rem]"
            src="https://img.icons8.com/ios-glyphs/30/clipboard.png"
            alt="clipboard"
          />
        </div>

        <div className="relative mt-[2rem]">
          <label className="block mb-[.5rem] text-[#ccc] text-[1.4rem]">
            Public Key
          </label>
          <input
            readOnly
            value={"tpknam1qzzv9svn9lrke...n8l6fz"}
            className="w-full p-[1rem] text-[1.4rem] text-black bg-secondary rounded-lg"
          ></input>

          <img
            onClick={() => copyHandler(publicKey)}
            width="30"
            height="30"
            className="cursor-pointer absolute top-0 right-3 translate-y-[50%] mt-[1.5rem]"
            src="https://img.icons8.com/ios-glyphs/30/clipboard.png"
            alt="clipboard"
          />
        </div>

        <div className="relative mt-[2rem] mb-[4rem]">
          <label className="block mb-[.5rem] text-[#ccc] text-[1.4rem]">
            Your Shielded Address
          </label>
          <input
            readOnly
            value={"znam1p2wvuaz27r7g20r...mhjwu"}
            className="w-full p-[1rem] text-[1.4rem] text-black bg-secondary rounded-lg"
            name="ShieldedAddress"
          ></input>

          <img
            onClick={() => copyHandler(shieldedAddress)}
            width="30"
            height="30"
            className="cursor-pointer absolute top-0 right-3 translate-y-[50%] mt-[1.5rem]"
            src="https://img.icons8.com/ios-glyphs/30/clipboard.png"
            alt="clipboard"
          />
        </div>
      </div>

      <ButtonNotAllow title={"Finish Setup"} allow={true} />
    </div>
  );
};

export default WalletList;
