import SideBar from "../../components/layout/Side-bar";

const HelpAndSupport = () => {
  return (
    <div className="flex justify-between items-start max-w-[80rem]  bg-primary rounded-lg w-[90%] p-[2rem] xxsm:p-[0rem] shadow-custom-shadow  h-[90vh] xxsm:max-h-[70rem]">
      <SideBar currActive={"help"} />

      <section className="bg-[#2a2a2a] rounded-lg max-w-[48rem] w-full p-[2rem] shadow-custom-shadow m-[1rem]">
        <h1 className="text-center m-auto my-auto">Help and Support</h1>
      </section>
    </div>
  );
};

export default HelpAndSupport;
