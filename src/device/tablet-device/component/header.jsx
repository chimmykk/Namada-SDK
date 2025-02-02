import Logo from "../../../assets/Namada-logo";
import Scanncer from "../../../assets/icons/scan";
import Notification from "../../../assets/icons/bell";
import Profile from "../../../assets/icons/people";

const Header = () => {
  return (
    <header className="bg-primary w-full  p-8 flex gap-4 items-center">
      <Logo w={56} color="currentColor" />
      <h1 className="text-[3.4rem] font-sans">Namada App</h1>

      <div className="flex justify-center items-center gap-4 ml-auto">
        <Scanncer w={28} color={"currentColor"} />

        <aside className="relative">
          <b className="bg-yellow text-[1.2rem] absolute left-6 top-[-.4rem] rounded-full text-center w-8 h-8 flex items-center justify-center">
            8
          </b>
          <Notification w={28} color={"currentColor"} />
        </aside>

        <aside className="p-6 bg-secondary rounded-full ml-8">
          <Profile w={28} color={"currentColor"} />
        </aside>
      </div>
    </header>
  );
};

export default Header;
