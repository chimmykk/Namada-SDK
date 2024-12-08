import MobileNav from "../components/layout/mobile-nav";
import AddressBookIcon from "../assets/icons/address-book";
import CurrencyIcon from "../assets/icons/currency-change";
import GlobalIcon from "../assets/icons/global";
import SyncIcon from "../assets/icons/sync";
import ToggleIcon from "../assets/icons/toggle";
import WalletIcon from "../assets/icons/wallet";
import MenuIcon from "../assets/icons/menu";
import Notification from "../assets/icons/notification";
import MoonIcon from "../assets/icons/moon";
import PlusIcon from "../assets/icons/plus";
import SecurityShieldIcon from "../assets/icons/security-shield";
import BackUpIcon from "../assets/icons/back-up";
import KeyIcon from "../assets/icons/key";
import LinkThree from "../assets/icons/link-three";
import SecurityIcon from "../assets/icons/shield";
import RightAchorIcon from "../assets/icons/right-achor";
import FaqIcon from "../assets/icons/faq";
import ConnectIcon from "../assets/icons/contact-support";
import ReportIcon from "../assets/icons/report-issue";

const NewSettings = () => {
  return (
    <div className="flex w-full flex-col h-fit bg-[#2A2A2A]">
      <section className="flex justify-between mt-8 px-8">
        <MenuIcon />
        <p className="text-[1.8rem]">Settings</p>
        <Notification w={24} />
      </section>

      <main className=" w-full mt-10">
        <div className="flex justify-between gap-8 px-10">
          <div className="flex flex-col items-center bg-[#2E2E2E] rounded-2xl p-8 w-full gap-2">
            <SyncIcon w={24} />
            <p className="text-center">Connection</p>
          </div>

          <div className="flex flex-col items-center bg-[#2E2E2E] rounded-2xl p-8 w-full gap-2">
            <WalletIcon w={24} />
            <p className="text-center">Wallets</p>
          </div>
        </div>

        <div className="mt-12 px-8 border-b-[0.2rem] border-[#4d4d4d] py-4">
          <div className="flex gap-4 items-center justify-center">
            <MoonIcon />
            <p>Dark Mode</p>
            <aside className="ml-auto">
              <ToggleIcon />
            </aside>
          </div>
        </div>

        <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
          <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Address Book</p>

          <div className="mt-8 mx-8 bg-[#2E2E2E] rounded-2xl">
            <div className="flex gap-8 items-center pl-8">
              <AddressBookIcon w={24} color={"white"} />
              <p className="border-b-[0.2rem] border-[#4d4d4d] py-8 w-full">
                Address wallet
              </p>
            </div>

            <div className="flex gap-8 items-center pl-8">
              <PlusIcon w={24} color={"white"} />
              <p className=" py-8 w-full">Address wallet</p>
            </div>
          </div>
        </div>

        <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
          <p className=" mt-8 mx-8 text-[1.8rem] font-medium">
            Wallet Settings
          </p>

          <div className="mt-8 rounded-2xl flex flex-col gap-8">
            <div className="flex gap-8 items-center pl-8">
              <div className="bg-[#FFC800] p-4 rounded-xl">
                <CurrencyIcon w={24} color={"black"} />
              </div>

              <div>
                <p className="w-full">Currency Preferences</p>
                <p className="text-[1.2rem] text-[#bbb]">NAM</p>
              </div>
            </div>

            <div className="flex gap-8 items-center pl-8">
              <div className="bg-[#FFC800] p-4 rounded-xl">
                <GlobalIcon w={24} color={"black"} />
              </div>

              <div>
                <p className="w-full">Address wallet</p>
                <p className="text-[1.2rem] text-[#bbb]">English</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
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
                <p className="text-[1.2rem] text-[#bbb]">
                  Last backup: 1 hour ago
                </p>
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

        <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
          <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Others</p>

          <div className="mt-8 rounded-2xl flex flex-col gap-8">
            <div className="flex gap-8 items-center px-8">
              <div className="p-4 rounded-xl">
                <LinkThree w={24} color={"white"} />
              </div>

              <p className="w-full">Connect setting</p>
              <RightAchorIcon w={24} />
            </div>

            <div className="flex gap-8 items-center px-8">
              <div className="p-4 rounded-xl">
                <WalletIcon w={24} color={"white"} />
              </div>

              <p className="w-full">Backup Now</p>
              <RightAchorIcon w={24} />
            </div>

            <div className="flex gap-8 items-center px-8">
              <div className="p-4 rounded-xl">
                <SecurityIcon w={24} color={"white"} />
              </div>

              <p className="w-full">Change Password</p>
              <RightAchorIcon w={24} color={"white"} />
            </div>
          </div>
        </div>

        <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
          <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Address Book</p>

          <div className="mt-8 mx-8 bg-[#2E2E2E] rounded-2xl">
            <div className="flex gap-8 items-center pl-8">
              <FaqIcon w={24} color={"white"} />
              <p className="border-b-[0.2rem] border-[#4d4d4d] py-8 w-full">
                FAQ
              </p>
            </div>

            <div className="flex gap-8 items-center pl-8">
              <ConnectIcon w={24} color={"white"} />
              <p className="border-b-[0.2rem] border-[#4d4d4d] py-8 w-full">
                Contact Support
              </p>
            </div>

            <div className="flex gap-8 items-center pl-8">
              <ReportIcon w={24} color={"white"} />
              <p className=" py-8 w-full">Report an Issue</p>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default NewSettings;
