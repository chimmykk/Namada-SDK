import { useState } from "react";
import { useNavigate } from "react-router";

import BackButton from "../components/ui/backButton";
import StepIndicator from "../components/ui/step-indicator";
import { Button } from "react-native-web";

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
      className="relative p-[20px] bg-[#2a2a2a] rounded-lg w-[300px] flex flex-col justify-start items-center h-[350px]"
      style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)" }}
    >
      <BackButton />

      <StepIndicator activeNumber={4} />
      <h2 className="font-medium mt-[40px]">Create Your Account</h2>

      <div className="mt-[40px] w-full">
        <label className="text-[12px]">Keys Name</label>
        <input
          onChange={nameInputHandler}
          className="block rounded-md bg-black text-[16px] w-full px-[10px] py-[5px] mt-2 focus:outline-none focus:bg-[#111] target:outline-none active:outline-none "
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
        } bg-[#c69f03] text-center text-black w-full p-[6px] rounded-md mt-auto outline outline-1 active:scale-95`}
        style={{ transition: "all 0.3s ease" }}
      >
        Next
      </button>
    </div>
  );
};

export default NewPage;
