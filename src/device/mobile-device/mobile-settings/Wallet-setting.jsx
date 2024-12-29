import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";
import MobileLayout from "../../../components/layout/mobile-layout";
import Toggle from "../../../components/ui/toggle";

const WalletSetting = () => {
  function getToggle(active, id) {
    console.log(active, id);
  }

  return (
    <MobileLayout>
      <section className="grid grid-cols-[1fr,10fr,1fr] p-8 px-8">
        <Link to={"/mobile/setting"}>
          <ArrowLeftIcon color={"currentColor"} />
        </Link>
        <p className="text-[1.8rem] font-bold text-center">Wallet setting</p>
      </section>

      <ul className="flex p-8 flex-col gap-8">
        <li className="flex items-center justify-between w-full">
          <p>Enable Wallet Backup</p>
          <Toggle getValue={getToggle} id={1} />
        </li>

        <li className="flex items-center justify-between w-full">
          <p>Enable Multi-Signature</p>
          <Toggle getValue={getToggle} id={2} />
        </li>

        <li className="flex items-center justify-between w-full">
          <p>Show Wallet Balance</p>
          <Toggle getValue={getToggle} id={2} />
        </li>
      </ul>
    </MobileLayout>
  );
};

export default WalletSetting;
