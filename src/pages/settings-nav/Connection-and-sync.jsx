import { Link } from "react-router-dom";
import ButtonBack from "../../components/ui/button-back";
import Toggle from "../../components/ui/toggle";

const ConnectionAndSync = () => {
  const button = (title) => {
    return (
      <button
        className="bg-[#ffc800] text-white py-[1rem] px-[2rem] rounded-md text-[1.8rem] hover:bg-[#ffc800] w-auto flex items-center justify-center"
        style={{ transition: "all 0.3s ease" }}
      >
        {title}
      </button>
    );
  };

  return (
    <>
      <section className="p-8 h-full flex flex-col md:w-auto xxsm:w-full">
        <div className="flex justify-between w-full mb-10 md:hidden">
          <ButtonBack w={24} color={"white"} to={"/mobile-wallets"} />
          <p className="text-[1.8rem]">Connection and Sync</p>
          <b></b>
        </div>

        <div className="flex justify-between items-center h-20 mb-8 md:hidden">
          <label>Shielded Sync</label>
          <Toggle />
        </div>

        <label className="font-bold my-[1rem] text-[1.8rem] block">
          Network name
        </label>
        <input
          placeholder="Network name"
          type="text"
          className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.8rem] bg-[#333]"
        ></input>

        <label className="font-bold my-[1rem] text-[1.8rem] block">
          New RPC URL
        </label>

        <input
          placeholder="New RPC URL"
          type="text"
          className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.8rem] bg-[#333]"
        ></input>

        <label className="font-bold my-[1rem] text-[1.8rem] block">
          Chain ID
        </label>

        <input
          placeholder="Chain ID"
          type="text"
          className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.8rem] bg-[#333]"
        ></input>

        <label className="font-bold my-[1rem] block text-[1.8rem]">
          Currency symbol
        </label>

        <input
          placeholder="Currency symbol"
          type="text"
          className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.8rem] bg-[#333]"
        ></input>

        <label className="font-bold my-[1rem] block text-[1.8rem]">
          Block explorer URL (Optional)
        </label>

        <input
          placeholder="Block explorer URL"
          type="text"
          className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.8rem] bg-[#333]"
        ></input>

        <div className="grid grid-cols-3 gap-4 mt-[3.6rem] xxsm:grid-cols-2 md:grid-cols-3 xxsm:mt-auto">
          {button("Cancel")}

          {button("Save")}

          <aside className="xxsm:hidden md:block">
            {button("Turn Shielded Sync")}
          </aside>
        </div>
      </section>
    </>
  );
};

export default ConnectionAndSync;
