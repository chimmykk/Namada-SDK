import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";
import MobileLayout from "../../../components/layout/mobile-layout";
import Toggle from "../../../components/ui/toggle";

const ConnectionSetting = () => {
  function getToggle(active, id) {
    console.log(active, id);
  }
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <section className="grid grid-cols-[1fr,10fr,1fr] p-8 px-8">
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon color={"currentColor"} />
        </button>
        <p className="text-[1.8rem] font-bold text-center">
          Connection setting
        </p>
      </section>

      <ul className="flex p-8 flex-col gap-8">
        <li className="flex items-center justify-between w-full">
          <p>Enable Sync</p>
          <Toggle getValue={getToggle} id={1} />
        </li>

        <li className="flex items-center justify-between w-full">
          <p>Use Proxy</p>
          <Toggle getValue={getToggle} id={2} />
        </li>
      </ul>
    </MobileLayout>
  );
};

export default ConnectionSetting;
