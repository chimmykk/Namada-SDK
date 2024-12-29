import MobileNav from "./mobile-nav";

const MobileLayout = ({ children }) => {
  return (
    <main className="flex w-full flex-col h-screen bg-primary">{children}</main>
  );
};

export default MobileLayout;
