function SendToken() {
  /* ------------ Chanage the transfer type handler ------------*/
  const changeTypeHandler = (e) => {
    const getValue = e.target.value;
    // console.log(getValue);
  };

  return (
    <div
      className="bg-primary p-[4rem] w-[38rem] rounded-lg hover:translate-y-[-5px] xxsm:w-[90%]"
      style={{
        boxShadow: "0 1rem 2.5 #ffc800",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="text-[1.4rem] text-right text-[#14d60b] mb-[1rem]">
        ● SYNCHRONIZED
      </div>
      <h2 className="text-[2.8rem] mb-[2.5rem] text-center text-[#f0f4f8] font-medium">
        Send Token
      </h2>

      {/* ------------ Iput Recipient Address Layout ------------*/}
      <input
        type="text"
        placeholder="Recipient Address"
        className="w-full p-[1rem] rounded-md my-[1rem] bg-primary text-white text-[1.6rem] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942] outline outline-1"
        style={{ transition: "all 0.3s ease-in-out" }}
      ></input>

      {/* ------------ Input NAM & USD Layout ------------*/}
      <div className="flex gap-4 w-full">
        <input
          type="number"
          className="p-[1rem] my-[1rem] rounded-md bg-primary text-[1.6rem] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942] w-full outline outline-1"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="NAM: 0.0000"
        ></input>
        <input
          type="number"
          className="p-[1rem] my-[1rem] rounded-md bg-primary text-[1.6rem] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942] w-full outline outline-1"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="USD: 0.00"
        ></input>
      </div>

      {/* ------------ Available Balance Layout ------------*/}
      <p className="text-[1.8rem] text-[#8894b4]">Available Balance: 0.0 NAM</p>

      {/* ------------- Input Note Optional Layout ------------- */}
      <input
        type="text"
        placeholder="Note (optional)"
        className="w-full p-[1rem] mt-[4rem] rounded-md my-[1rem] mb-[5rem] bg-primary text-white text-[1.6rem] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942] outline outline-1"
        style={{ transition: "all 0.3s ease-in-out" }}
      ></input>

      {/* ------------ Estimated Fee Layout ------------*/}
      <div className="flex justify-around mt-[1.5rem] ">
        <p className="text-[#a7b3d1] text-[1.4rem]">Estimated fee:</p>
        <p className="text-[#a7b3d1] text-[1.4rem]">0.0 NAM | 0.00 USD</p>
      </div>

      {/* ------------ Select the transfer type Layout ------------*/}
      <div className="flex gap-3">
        <label className="text-[#a7b3d1] text-[1.4rem]"> Transfer Type</label>
        <select
          onChange={(e) => changeTypeHandler(e)}
          className="w-full p-[1rem] my-[1rem] border-none rounded-md bg-primary text-white text-[1.8rem] focus:outline-none focus:border focus:border-[#57a6ff] focus:bg-[#1f2942]"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <option
            className="mt-[1.5rem] text-[1.6rem] text-white cursor-pointer text-left"
            disabled
          >
            Select Transfer Type
          </option>

          <option
            className="mt-[1.5rem] text-[1.4rem] text-white cursor-pointer text-left"
            value={"IBC"}
          >
            IBC
          </option>

          <option
            className="mt-[1.5rem] text-[1.4rem] text-white cursor-pointer text-left"
            value={"Shielded"}
          >
            Shielded
          </option>

          <option
            className="mt-[1.5rem] text-[1.4rem] text-white cursor-pointer text-left"
            value={"Transparent"}
          >
            Transparent
          </option>
        </select>
      </div>

      <p className="mt-[1.5rem] text-[1.4rem] text-[#6e82a5] cursor-pointer text-right">
        Coin Control (optional)
      </p>

      {/* ------------ Send Button ------------*/}
      <button
        className="bg-[#ffc800] text-[#202020] font-semibold w-full uppercase p-[1rem] rounded-lg mt-[1rem] hover:bg-[#cc9b00]"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        Send
      </button>
    </div>
  );
}

export default SendToken;
