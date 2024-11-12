const DropDown = ({ select }) => {
  const selectedHandler = (e) => {
    select(e.target.value);
  };

  return (
    <div className="w-full">
      <select
        onChange={(e) => selectedHandler(e)}
        className="w-full p-[10px] rounded-md bg-[#000] text-white text-[14px]"
      >
        <option value={24} className="bg-primary">
          I have a 24-word phrase
        </option>
        <option value={12} className="bg-primary">
          I have a 12-word phrase
        </option>
      </select>
    </div>
  );
};

export default DropDown;
