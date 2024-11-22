import "./App.css";
import Button from "./components/ui/button";

function App() {
  return (
    <div className="bg-[#1e1e1e] flex justify-center items-center  leading-[1.5] ">
      <div className="p-[2rem] rounded-xl max-w-[35rem] margin-auto text-center bg-[#2a2a2a] border-2 border-[#4b4b4d] flex justify-center flex-col items-center">
        <div className="h-full mb-[1rem] p-[1.5]">
          <img
            src="https://play-lh.googleusercontent.com/VRqo1bQjwHpkYU3ywbL7CXaT1A56_t_3wPioG_GiajSnGtn6aTTzB69My4oOLBHvnw"
            alt="Cake Wallet Logo"
            className="h-[6em] mb-[2rem]"
          />
        </div>
        <h1 className="text-[2.4rem] mb-[1rem] text-white text-center font-bold">
          Welcome to Zoro
        </h1>

        <p className="mt-[1rem] leading-10 text-[1.6rem]">
          Keep Your Cryto Safe: Privacy Meets Security with Zoro!
        </p>

        <div className="flex flex-col mt-[2rem] font-medium">
          <Button title="Create New Wallet" link={"/create-new-wallet"} />
          <Button title="Restore Wallet" link={"/restore-wallet"} />
        </div>
      </div>
    </div>
  );
}

export default App;
