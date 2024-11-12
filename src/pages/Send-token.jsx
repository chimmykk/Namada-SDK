function SendToken() {
  /* ------------ Chanage the transfer type handler ------------*/
  const changeTypeHandler = (e) => {
    const getValue = e.target.value;
    // console.log(getValue);
  };

  return (
    <div
      className="bg-primary p-[40px] w-[380px] rounded-lg hover:translate-y-[-5px]"
      style={{
        boxShadow: "0 10px 25px #ffc800",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="text-[12px] text-right text-[#14d60b] mb-[10px]">
        ● SYNCHRONIZED
      </div>
      <h2 className="text-[28px] mb-[25px] text-center text-[#f0f4f8] font-medium">
        Send Token
      </h2>

      {/* ------------ Iput Recipient Address Layout ------------*/}
      <input
        type="text"
        placeholder="Recipient Address"
        className="w-full p-[10px] rounded-md my-[10px] bg-primary text-white text-[16px] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942]"
        style={{ transition: "all 0.3s ease-in-out" }}
      ></input>

      {/* ------------ Input NAM & USD Layout ------------*/}
      <div className="flex gap-4 w-full">
        <input
          type="number"
          className="p-[10px] my-[10px] rounded-md bg-primary text-[16px] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942] w-full"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="NAM: 0.0000"
        ></input>
        <input
          type="number"
          className="p-[10px] my-[10px] rounded-md bg-primary text-[16px] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942] w-full"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="USD: 0.00"
        ></input>
      </div>

      {/* ------------ Available Balance Layout ------------*/}
      <p className="text-[14px] text-[#8894b4]">Available Balance: 0.0 NAM</p>

      {/* ------------- Input Note Optional Layout ------------- */}
      <input
        type="text"
        placeholder="Note (optional)"
        className="w-full p-[10px] rounded-md my-[10px] bg-primary text-white text-[16px] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942]"
        style={{ transition: "all 0.3s ease-in-out" }}
      ></input>

      {/* ------------ Estimated Fee Layout ------------*/}
      <div className="flex justify-around mt-[15px] ">
        <p className="text-[#a7b3d1] text-[14px]">Estimated fee:</p>
        <p className="text-[#a7b3d1] text-[14px]">0.0 NAM | 0.00 USD</p>
      </div>

      {/* ------------ Select the transfer type Layout ------------*/}
      <div className="flex gap-3">
        <label className="text-[#a7b3d1] text-[14px]"> Transfer Type</label>
        <select
          onChange={(e) => changeTypeHandler(e)}
          className="w-full p-[10px] my-[10px] border-none rounded-md bg-primary text-white text-[16px] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942]"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <option
            className="mt-[15px] text-[14px] text-white cursor-pointer text-left"
            disabled
          >
            Select Transfer Type
          </option>

          <option
            className="mt-[15px] text-[14px] text-white cursor-pointer text-left"
            value={"IBC"}
          >
            IBC
          </option>

          <option
            className="mt-[15px] text-[14px] text-white cursor-pointer text-left"
            value={"Shielded"}
          >
            Shielded
          </option>

          <option
            className="mt-[15px] text-[14px] text-white cursor-pointer text-left"
            value={"Transparent"}
          >
            Transparent
          </option>
        </select>
      </div>

      <p className="mt-[15px] text-[14px] text-[#6e82a5] cursor-pointer text-right">
        Coin Control (optional)
      </p>

      {/* ------------ Send Button ------------*/}
      <button
        className="bg-[#ffc800] text-black font-bold w-full uppercase p-[10px] rounded-lg mt-[10px] hover:bg-[#cc9b00]"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        Send
      </button>
    </div>
  );
}

export default SendToken;
