const WalletSendToken = () => {
  /* ------------ Chanage the transfer type handler ------------*/
  const changeTypeHandler = (e) => {
    const getValue = e.target.value;
    // console.log(getValue);
  };

  return (
    <>
      <div className="text-[1.2rem] text-right text-[#14d60b] mb-[1rem]">
        ● SYNCHRONIZED
      </div>

      <h2 className="text-[2.8rem] mb-[2.5rem] text-center font-medium text-[#14d60b]">
        Send Token
      </h2>

      {/* ------------ Iput Recipient Address Layout ------------*/}
      <input
        type="text"
        placeholder="Recipient Address"
        className="w-full p-[1rem] rounded-md my-[1rem] bg-[#1e1e1e] focus:outline-none focus:outline focus:outline-[#57a6ff] text-white text-[1.6rem]  focus:bg-[#1f2942]"
        style={{
          transition: "all 0.3s ease-in-out",
          boxShadow: "",
        }}
      ></input>

      {/* ------------ Input NAM & USD Layout ------------*/}
      <div className="flex gap-4 w-full">
        <input
          type="number"
          className="p-[1rem] my-[1rem] rounded-md bg-[#1e1e1e] focus:outline-none focus:outline focus:outline-[#57a6ff] text-[1.6rem] focus:bg-[#1f2942] w-full"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="NAM: 0.0000"
        ></input>
        <input
          type="number"
          className="p-[1rem] my-[1rem] rounded-md bg-[#1e1e1e] focus:outline-none focus:outline focus:outline-[#57a6ff] text-[1.6rem] focus:bg-[#1f2942] w-full"
          style={{ transition: "all 0.3s ease-in-out" }}
          placeholder="USD: 0.00"
        ></input>
      </div>

      {/* ------------ Available Balance Layout ------------*/}
      <div className="mt-[3rem]">
        <p className="text-[1.4rem] text-[#8894b4]">
          Available Balance: 0.0 NAM
        </p>

        {/* ------------- Input Note Optional Layout ------------- */}
        <input
          type="text"
          placeholder="Note (optional)"
          className="w-full p-[1rem] rounded-md my-[1rem] bg-[#1e1e1e] focus:outline-none focus:outline focus:outline-[#57a6ff]  text-white text-[1.6rem] focus:bg-[#1f2942]"
          style={{ transition: "all 0.3s ease-in-out" }}
        ></input>
      </div>

      {/* ------------ Estimated Fee Layout ------------*/}
      <div className="flex justify-between mt-[3rem] ">
        <p className="text-[#a7b3d1] text-[1.4rem]">Estimated fee:</p>
        <p className="text-[#a7b3d1] text-[1.4rem]">0.0 NAM | 0.00 USD</p>
      </div>

      {/* ------------ Select the transfer type Layout ------------*/}
      <div className="flex gap-3 justify-between items-center">
        <label className="text-[#a7b3d1] text-[1.4rem]"> Transfer Type</label>
        <select
          onChange={(e) => changeTypeHandler(e)}
          className="w-full p-[1rem] max-w-[30rem] my-[1rem] bg-[#1e1e1e] focus:outline-none focus:outline focus:outline-[#57a6ff]  border-none rounded-md  text-white text-[1.6rem] focus:bg-[#1f2942]"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <option
            className="mt-[1.5rem] text-[1.4rem] text-white cursor-pointer text-left"
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

      <p className="mt-[1rem] text-[1.4rem] text-[#6e82a5] cursor-pointer text-right">
        Coin Control (optional)
      </p>

      {/* ------------ Send Button ------------*/}
      <button
        className="bg-[#ffc800] text-black font-bold w-full uppercase p-[1rem] rounded-lg mt-[4rem] hover:bg-[#cc9b00]"
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        Send
      </button>
    </>
  );
};

export default WalletSendToken;
