import { list } from "postcss";

const StepIndicator = ({ activeNumber }) => {
  const stepIndicator = [];

  for (let i = 0; i < 5; i++) {
    activeNumber > i
      ? stepIndicator.push(
          <div
            key={i}
            className="bg-[#ffc800] h-[1rem] w-[1rem] rounded-full cursor-pointer"
          ></div>
        )
      : stepIndicator.push(
          <div
            key={i}
            className="bg-[#444444] h-[1rem] w-[1rem] rounded-full cursor-pointer"
          ></div>
        );
  }

  return <div className="flex gap-2">{stepIndicator}</div>;
};

export default StepIndicator;
