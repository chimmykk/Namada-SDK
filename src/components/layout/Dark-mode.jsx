import { useContext } from "react";
import Toggle from "../../components/ui/toggle";
import MoonIcon from "../../assets/icons/moon";
import { ThemeContext } from "../../contexts/Theme";

const DarkModeLayout = () => {
  const context = useContext(ThemeContext);

  const getValue = (id) => {
    context.setDarkMode(!context.darkMode);
  };

  return (
    <div className="mt-12 px-8 text-primary border-b-[0.2rem] border-[#d3d3d3] dark:border-[#4d4d4d] py-6">
      <div className="flex gap-4 items-center justify-center">
        <MoonIcon w={24} color={"currentColor"} />
        <p className="text-primary">Dark Mode</p>
        <aside className="ml-auto">
          <Toggle getValue={getValue} state={context.darkMode} />
        </aside>
      </div>
    </div>
  );
};

export default DarkModeLayout;
