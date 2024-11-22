const ConnectionAndSync = () => {
  return (
    <>
      <label className="font-bold my-[1rem] block">Network name</label>
      <input
        placeholder="Network name"
        type="text"
        className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.4rem] bg-[#333]"
      ></input>

      <label className="font-bold my-[1rem] block">New RPC URL</label>

      <input
        placeholder="New RPC URL"
        type="text"
        className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.4rem] bg-[#333]"
      ></input>

      <label className="font-bold my-[1rem] block">Chain ID</label>

      <input
        placeholder="Chain ID"
        type="text"
        className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.4rem] bg-[#333]"
      ></input>

      <label className="font-bold my-[1rem] block">Currency symbol</label>

      <input
        placeholder="Currency symbol"
        type="text"
        className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.4rem] bg-[#333]"
      ></input>

      <label className="font-bold my-[1rem] block">
        Block explorer URL (Optional)
      </label>

      <input
        placeholder="Block explorer URL"
        type="text"
        className="w-full p-[.8rem] rounded-md border border-1 border-[#ffc800] mb-[1.5rem] text-[1.4rem] bg-[#333]"
      ></input>

      <div className="grid grid-cols-2 gap-4 mt-[2rem] xxsm:flex-col">
        <button
          className="bg-[#ff4d4d] text-white py-[1rem] px-[2rem] rounded-md text-[1.4rem] hover:bg-[#e60000] w-auto flex items-center justify-center"
          style={{ transition: "all 0.3s ease" }}
        >
          Cancel
        </button>

        <button
          className="bg-[#ffc800] text-black py-[1rem] px-[2rem] rounded-md text-[1.4rem] hover:bg-[#e0b800] w-auto flex items-center justify-center"
          style={{ transition: "all 0.3s ease" }}
        >
          Save
        </button>

        <button
          className="bg-[#007bff] text-white py-[1rem] px-[2rem] rounded-md text-[1.4rem] hover:bg-[#0056b3] w-full flex items-center justify-center xxsm:col-span-2"
          style={{ transition: "all 0.3s ease" }}
        >
          Turn Shielded Sync
        </button>
      </div>
    </>
  );
};

export default ConnectionAndSync;
