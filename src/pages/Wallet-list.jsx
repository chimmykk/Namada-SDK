import { useState } from "react";
import BackButton from "../components/ui/backButton";
import CopyIcon from "../assets/icons/copy";
import ButtonNotAllow from "../components/ui/button-not-allow";
import StepIndicator from "../components/ui/step-indicator";

const WalletList = () => {
  const [copyShow, setCopyShow] = useState(false);
  const generatedKeys = [
    { title: "Your Transparent Address", key: "tnam1qrtshzyauy...k8mz9j" },
    { title: "Public Key", key: "tpknam1qzzv9svn9lrke...n8l6fz" },
    { title: "Your Shielded Address", key: "znam1p2wvuaz27r7g20r...mhjwu" },
  ];

  const copyHandler = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopyShow(true);

        setTimeout(() => {
          setCopyShow(false);
        }, 3000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <>
      <div className="max-w-[40rem]  p-[2rem] bg-primary rounded-[1.2rem] shadow-custom-shadow relative xxsm:w-[90%]">
        <div className="flex justify-center my-[2rem]">
          <StepIndicator activeNumber={5} />
        </div>

        <BackButton link={"/new-page"} />
        <h2 className="text-center font-medium text-[2rem] mt-[2rem]">
          Namada Keys Created
        </h2>
        <p className="text-center text-[1.4rem] text-[#aaa] mb-[2rem]">
          Here are the accounts generated from your keys
        </p>

        <div className="mb-[5.6rem]">
          {generatedKeys.map((items) => {
            return (
              <div className="relative mt-6 ">
                <label className="block mb-[0.5rem] text-[#ccc] text-[1.4rem]">
                  {items.title}
                </label>

                <aside className="flex bg-secondary  p-[0.8rem] rounded-xl">
                  <p
                    readOnly
                    className="w-full text-[1.4rem] text-black bg-secondary rounded-lg m-auto"
                  >
                    {items.key}
                  </p>
                  <button onClick={() => copyHandler(items.key)}>
                    <CopyIcon color={"black"} />
                  </button>
                </aside>
              </div>
            );
          })}
        </div>

        <ButtonNotAllow title={"Finish Setup"} allow={true} />
      </div>

      {copyShow ? (
        <p className="absolute bottom-20 text-[#aaa]">Copied successfully!</p>
      ) : (
        ""
      )}
    </>
  );
};

export default WalletList;
