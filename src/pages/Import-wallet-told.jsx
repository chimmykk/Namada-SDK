import { useState, useEffect, useTransition } from "react";
import DropDown from "../components/ui/drop-down";
import Input3 from "../components/ui/input3";
import ButtonNotAllow from "../components/ui/button-not-allow";

const ImportWalletTold = () => {
  const [selected, setSelected] = useState(24);
  const [list, setList] = useState([]);

  // Drop down selected
  const DropDownHandler = (selectedValue) => {
    setSelected(selectedValue);
  };

  // To change the display input when seleted is change
  useEffect(() => {
    const inputs = [];

    for (let i = 1; i <= selected; i++) {
      inputs.push(<Input3 placeholder={i} key={i} />);
    }

    setList(inputs);
  }, [selected]);

  return (
    <section className="bg-[#2a2a2a] rounded-lg p-[2rem] shadow-custom-shadow max-w-[40rem] self-center xxsm:w-[90%]">
      <div className="flex justify-around items-center mt-[2rem] mb-[2rem]">
        <div className="flex text-center flex-col justify-center items-center gap-2">
          <span className="bg-[#4caf50] text-white w-[4rem] h-[4rem] rounded-full line-clamp-[3rem] font-bold flex justify-center items-center">
            1
          </span>
          <p className="text-[1.4rem] text-[#ccc] max-w-[100px]">
            Confirm secret recovery phrase
          </p>
        </div>

        <div className="flex text-center flex-col justify-center items-center gap-2">
          <span className="bg-[#2cb207] text-white w-[4rem] h-[4rem] rounded-full line-clamp-[3rem] font-bold flex justify-center items-center">
            2
          </span>
          <p className="text-[1.4rem] text-[#ccc]">Create password</p>
        </div>
      </div>

      <h1 className="text-[1.5rem] text-center mb-[1rem] font-medium">
        Access your wallet with your Secret Recovery Phrase
      </h1>

      <form className="mt-8">
        <label>Type your Secret Recovery Phrase</label>

        {/* Type your secret recovery phrase */}
        <div className="mt-2">
          <DropDown select={DropDownHandler} />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-[2rem]">{list}</div>

        <div className="mt-[3rem]">
          <ButtonNotAllow title={"Confirm Secret Recory Phrase"} allow={true} />
        </div>
      </form>
    </section>
  );
};

export default ImportWalletTold;
