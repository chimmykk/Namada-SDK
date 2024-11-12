import { useState } from "react";

const Input3 = ({ placeholder }) => {
  const [passwordHide, setPasswordHide] = useState(true);

  // Toggle password visibility when the button is clicked
  const clickHandler = () => {
    setPasswordHide(!passwordHide);
  };

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className="p-[10px] rounded-md bg-black text-white font-[14px] mr-[10px] focus:outline-none w-full pr-9"
        type={passwordHide ? "password" : "text"}
      ></input>

      <span
        onClick={clickHandler}
        className="absolute cursor-pointer right-2 top-[50%] translate-y-[-50%]"
      >
        {passwordHide ? "👁️" : "🙈"}
      </span>
    </div>
  );
};

export default Input3;
