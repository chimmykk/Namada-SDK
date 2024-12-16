import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";
import MobileLayout from "../../../components/layout/mobile-layout";
import Toggle from "../../../components/ui/toggle";

const ConnectionSetting = () => {
  function getToggle(active, id) {
    console.log(active, id);
  }

  return (
    <MobileLayout>
      <section className="grid grid-cols-[1fr,10fr,1fr] p-8 px-8">
        <Link to={"/mobile-setting"}>
          <ArrowLeftIcon color={"white"} />
        </Link>
        <p className="text-[1.8rem] font-bold text-center">Security setting</p>
      </section>

      <ul className="flex p-8 flex-col gap-8">
        <li className="flex items-center justify-between w-full">
          <p>Enable 2FA</p>
          <Toggle getValue={getToggle} id={1} />
        </li>
      </ul>
    </MobileLayout>
  );
};

export default ConnectionSetting;
