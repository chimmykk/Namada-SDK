import { useState } from "react";
import { useNavigate } from "react-router";

import BackButton from "../components/ui/backButton";
import StepIndicator from "../components/ui/step-indicator";

const NewPage = () => {
  const [validInput, setValidInput] = useState(false);
  const [nameInput, setNameInput] = useState();

  const navigate = useNavigate();

  const nameInputHandler = (e) => {
    const inputValue = e.target.value;
    setNameInput(inputValue);

    inputValue.length > 0 ? setValidInput(true) : setValidInput(false);
  };

  return (
    <div
      className="relative p-[2rem] bg-[#2a2a2a] rounded-lg w-[30rem] flex flex-col justify-start items-center h-[35rem] xxsm:w-[90%]"
      style={{ boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.5)" }}
    >
      <BackButton />

      <StepIndicator activeNumber={4} />
      <h2 className="font-medium mt-[4rem]">Create Your Account</h2>

      <div className="mt-[4rem] w-full">
        <label className="text-[1.2rem]">Keys Name</label>
        <input
          onChange={nameInputHandler}
          className="block rounded-md bg-black text-[1.6rem] w-full px-[1rem] py-[0.5rem] mt-2 focus:outline-none focus:bg-[#111] target:outline-none active:outline-none "
          style={{ transition: "all 0.3s ease" }}
          placeholder="e.g. Namada Shielded Wallet"
        ></input>
      </div>

      <button
        disabled={!validInput}
        onClick={() => {
          navigate("/");
        }}
        className={`${
          validInput
            ? "cursor-pointer bg-[#ffc800] hover:bg-[#c69f03]"
            : "cursor-not-allowed"
        } bg-[#c69f03] text-center text-black w-full p-[0.6rem] rounded-md mt-auto outline outline-1 active:scale-95`}
        style={{ transition: "all 0.3s ease" }}
      >
        Next
      </button>
    </div>
  );
};

export default NewPage;
