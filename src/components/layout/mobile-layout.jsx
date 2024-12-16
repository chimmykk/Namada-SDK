import MobileNav from "./mobile-nav";

const MobileLayout = ({ children }) => {
  return (
    <main className="flex w-full flex-col h-screen bg-[#2A2A2A]">
      {children}
    </main>
  );
};

export default MobileLayout;
