import { useState, useRef, useEffect, use } from "react";
import DownIcon from "../../../assets/icons/down-achor";
import LeftIcon from "../../../assets/icons/arrow-left";
import CopyIcon from "../../../assets/icons/copy";
import { Link } from "react-router-dom";
import UpAnchorIcon from "../../../assets/icons/up-anchor";

const Receive = () => {
  const [addressType, setAddressType] = useState("Segwit");
  const [showAddressType, setShowAddressType] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const addressRef = useRef(null);
  const [addressActive, setAddressActive] = useState([]);

  const addressList = [
    {
      title: "Transparent (Segwit)",
      image:
        "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:bc1qexampleaddress&size=150x150",
      code: "bc1qf6zfy4we300vjx3fn0dnwwtjg33f0uvha8c4de",
    },
    {
      title: "Shielded (ZK)",
      image:
        "https://api.qrserver.com/v1/create-qr-code/?data=bitcoin:zs1p4vexampleaddressshieldedzksnarks&size=150x150",
      code: "zs1p4vexampleaddressshieldedzksnarks",
    },
  ];

  useEffect(() => {
    const fistActive = addressList[0];
    setAddressActive(fistActive);
  }, []);

  // Change the Address Type
  const addressTypeHandler = () => {
    setShowAddressType(!showAddressType);
  };

  const addressActiveHandler = (data) => {
    setAddressActive(data);
    setShowAddressType(!showAddressType);
  };

  // Copy the Address
  function CopyAddressHandler(e) {
    const textValue = addressRef.current.textContent;

    if (textValue)
      navigator.clipboard
        .writeText(textValue)
        .then(() => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        })
        .catch((err) => console.log(err));
  }

  return (
    <section className="bg-[#2A2A2A] h-screen w-full p-8 relative">
      <Link to={"/mobile-wallets"} className="pb-8 flex justify-between">
        <LeftIcon color={"#fff"} />
      </Link>

      <p className="text-[2.4rem] font-bold mt-8">Receive</p>

      <div className="border border-[#6b6b6b] mt-8 h-fit rounded-[0.8rem] flex flex-col justify-center items-center p-8 gap-8">
        <div className="p-4 bg-[#fff] rounded-[1.2rem] mt-8">
          <img src={addressActive.image} />
        </div>

        <p className="text-[2.4rem] font-bold">Address Type:</p>

        <div className="w-full relative">
          <button
            onClick={addressTypeHandler}
            className="flex border w-full rounded-[0.8rem] p-4 justify-between"
          >
            {addressActive.title}{" "}
            {!showAddressType ? <DownIcon /> : <UpAnchorIcon />}
          </button>

          {showAddressType ? (
            <div className="absolute top-20 rounded-[0.8rem] left-1/2 translate-x-[-50%] bg-[#3a3a3a] w-full flex flex-col justify-start items-start">
              {addressList.map((items) => {
                return (
                  <div className="w-full rounded-[0.8rem]">
                    <button
                      onClick={() => addressActiveHandler(items)}
                      className={`${
                        addressActive.title === items.title
                          ? "bg-[#9b9b9b]"
                          : "text-[#fff]"
                      } w-full text-start py-4 px-8 rounded-[0.8rem]`}
                    >
                      {items.title}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="mt-8 flex w-full justify-center flex-col items-center gap-4">
          <p ref={addressRef} className="text-[1.2rem] text-[#aaa]">
            {addressActive.code}
          </p>

          <button
            onClick={CopyAddressHandler}
            className="bg-[#FFC800] rounded-[0.8rem] w-full p-4 flex justify-center gap-4"
          >
            Copy
            <CopyIcon />
          </button>
        </div>
      </div>

      {showAlert ? (
        <p className="text-center mt-8 h-full text-[#9b9b9b]">
          Address copied to clipboard
        </p>
      ) : (
        ""
      )}
    </section>
  );
};

export default Receive;
