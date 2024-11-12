const SecurityAndBackup = () => {
  return (
    <div className="flex flex-col justify-center gap-4 max-w-[350px]">
      <h1 className="text-[24px] font-bold mb-[10px] text-[#e0e0e0]">
        Security and Backup
      </h1>
      <p className="text-[18px]">
        Set 2-factor authentication, backup options, and secure your account.
      </p>

      <div className="border-t-[1px] border-[#333] pt-[10px] flex items-center justify-between">
        <span className="text-[18px]">2-Factor Authentication</span>
        <button
          className="bg-[#3a6ea5] py-[8px] px-[20px] rounded-md text-[16px] hover:bg-[#5084c2]"
          style={{ transition: "all 0.3s ease" }}
        >
          Enable
        </button>
      </div>

      <div className="border-t-[1px] border-[#333] pt-[10px] flex items-center justify-between">
        <span className="text-[18px]">Backup Options</span>
        <button
          className="bg-[#3a6ea5] py-[8px] px-[20px] rounded-md text-[16px] hover:bg-[#5084c2]"
          style={{ transition: "all 0.3s ease" }}
        >
          Backup Now
        </button>
      </div>

      <div className="border-t-[1px] border-[#333] pt-[10px] flex items-center justify-between">
        <span className="text-[18px]">2-Factor Authentication</span>
        <button
          className="bg-[#a53a3a] py-[8px] px-[20px] rounded-md text-[14px] hover:bg-[#c25252]"
          style={{ transition: "all 0.3s ease" }}
        >
          Reveal
        </button>
      </div>
    </div>
  );
};

export default SecurityAndBackup;
