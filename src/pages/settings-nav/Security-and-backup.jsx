const SecurityAndBackup = () => {
  return (
    <div className="flex flex-col justify-center gap-4 max-w-[35rem]">
      <h1 className="text-[2.4rem] font-bold mb-[1rem] text-[#e0e0e0]">
        Security and Backup
      </h1>
      <p className="text-[1.8rem]">
        Set 2-factor authentication, backup options, and secure your account.
      </p>

      <div className="border-t-[.1rem] border-[#333] pt-[1rem] flex items-center justify-between">
        <span className="text-[1.8rem]">2-Factor Authentication</span>
        <button
          className="bg-[#3a6ea5] py-[.8rem] px-[2rem] rounded-md text-[1.6rem] hover:bg-[#5084c2] xxsm:px-[1rem] xxsm:py-[1rem]"
          style={{ transition: "all 0.3s ease" }}
        >
          Enable
        </button>
      </div>

      <div className="border-t-[.1rem] border-[#333] pt-[1rem] flex items-center justify-between">
        <span className="text-[1.8rem]">Backup Options</span>
        <button
          className="bg-[#3a6ea5] py-[.8rem] px-[2rem] rounded-md text-[1.6rem] hover:bg-[#5084c2] xxsm:px-[1rem] xxsm:py-[1rem]"
          style={{ transition: "all 0.3s ease" }}
        >
          Backup Now
        </button>
      </div>

      <div className="border-t-[.1rem] border-[#333] pt-[1rem] flex items-center justify-between">
        <span className="text-[1.8rem]">2-Factor Authentication</span>
        <button
          className="bg-[#a53a3a] py-[.8rem] px-[2rem] rounded-md text-[1.4rem] hover:bg-[#c25252] xxsm:px-[1rem] xxsm:py-[1rem]"
          style={{ transition: "all 0.3s ease" }}
        >
          Reveal
        </button>
      </div>
    </div>
  );
};

export default SecurityAndBackup;
