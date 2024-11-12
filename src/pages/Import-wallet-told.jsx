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
    <section className="bg-[#2a2a2a] rounded-lg p-[20px] shadow-custom-shadow max-w-[400px] self-center">
      <div className="flex justify-around items-center mt-[20px] mb-[20px]">
        <div className="flex text-center flex-col justify-center items-center gap-2">
          <span className="bg-[#4caf50] text-white w-[40px] h-[40px] rounded-full line-clamp-[30px] font-bold flex justify-center items-center">
            1
          </span>
          <p className="text-[14px] text-[#ccc]">
            Confirm secret recovery phrase
          </p>
        </div>

        <div className="flex text-center flex-col justify-center items-center gap-2">
          <span className="bg-[#2cb207] text-white w-[40px] h-[40px] rounded-full line-clamp-[30px] font-bold flex justify-center items-center">
            2
          </span>
          <p className="text-[14px] text-[#ccc]">Create password</p>
        </div>
      </div>

      <h1 className="text-[1.5rem] text-center mb-[10px] font-medium">
        Access your wallet with your Secret Recovery Phrase
      </h1>

      <form>
        <label>Type your Secret Recovery Phrase</label>

        <div className="">
          <DropDown select={DropDownHandler} />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-[20px]">{list}</div>

        <div className="mt-[30px]">
          <ButtonNotAllow title={"Confirm Secret Recory Phrase"} allow={true} />
        </div>
      </form>
    </section>
  );
};

export default ImportWalletTold;
