const Wallet = () => {
  return (
    <section className="bg-[#2a2a2a] rounded-lg max-w-[48rem] w-full p-[2rem] shadow-custom-shadow m-[1rem]">
      <div className="flex items-center justify-between ">
        <h1 className="font-medium">My Account</h1>
        <p className="bg-secondary text-black px-2 rounded-full text-[1rem]">
          SYNCHRONIZED
        </p>
      </div>

      <div className="bg-[#3a3a3a] px-4 py-2 rounded-md mt-[4rem]">
        <p className="text-[1.6rem] text-[#e9e9e9]">Available Balance</p>
        <p className="text-[2.8rem] font-medium mt-2">0.00 NAM</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[1.6rem] mt-[3rem]">
        <button
          className="bg-secondary text-black p-[1rem] rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
          style={{ transition: "all 0.3s ease" }}
        >
          Recieve
        </button>

        <button
          className="bg-secondary text-black p-[1rem] rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
          style={{ transition: "all 0.3s ease" }}
        >
          Send
        </button>
        <button
          className="bg-secondary text-black p-[1rem] rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
          style={{ transition: "all 0.3s ease" }}
        >
          Buy
        </button>

        <button
          className="bg-secondary text-black p-[1rem] rounded-md hover:bg-[#c69f03] hover:translate-y-[-2px]"
          style={{ transition: "all 0.3s ease" }}
        >
          Sell
        </button>
      </div>
    </section>
  );
};

export default Wallet;
