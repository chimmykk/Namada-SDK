import SecurityShieldIcon from "../../../../../assets/icons/security-shield";
import BackUpIcon from "../../../../../assets/icons/back-up";
import KeyIcon from "../../../../../assets/icons/key";

const SecurityBackupLayout = () => {
  return (
    <div className=" border-b-[0.2rem] border-[#d3d3d3] dark:border-[#4d4d4d] pb-8">
      <p className=" mt-8 mx-8 text-[1.8rem] font-medium">
        Security and Backup
      </p>

      <div className="mt-8 rounded-2xl flex flex-col gap-8">
        <div className="flex gap-8 items-center pl-8">
          <div className="bg-[#FFC800] p-4 rounded-xl">
            <SecurityShieldIcon w={24} color={"black"} />
          </div>

          <div>
            <p className="w-full">Security Status</p>
            <p className="text-[1.2rem] text-[#bbb]">Secure</p>
          </div>
        </div>

        <div className="flex gap-8 items-center pl-8">
          <div className="bg-[#FFC800] p-4 rounded-xl">
            <BackUpIcon w={24} color={"black"} />
          </div>

          <div>
            <p className="w-full">Backup Now</p>
            <p className="text-[1.2rem] text-[#bbb]">Last backup: 1 hour ago</p>
          </div>
        </div>

        <div className="flex gap-8 items-center pl-8">
          <div className="bg-[#FFC800] p-4 rounded-xl">
            <KeyIcon w={24} color={"black"} />
          </div>

          <div>
            <p className="w-full">Change Password</p>
            <p className="text-[1.2rem] text-[#bbb]">
              Enter your current password to change
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBackupLayout;
