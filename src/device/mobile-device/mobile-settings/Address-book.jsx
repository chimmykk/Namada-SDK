import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";
import CopyIcon from "../../../assets/icons/copy";
import MobileLayout from "../../../components/layout/mobile-layout";
import PlusIcon from "../../../assets/icons/Plus";
import DeleteIcon from "../../../assets/icons/delete";

const AddressBook = () => {
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    fetch("/api/account.json")
      .then((res) => res.json())
      .then((data) => setAccountList(data))
      .catch((err) => console.log("Something when wrong", err));
  }, []);

  return (
    <MobileLayout>
      <section className="grid grid-cols-[1fr,10fr,1fr] p-8 px-8">
        <Link to={"/mobile-setting"}>
          <ArrowLeftIcon color={"white"} w={20} />
        </Link>
        <p className="text-[1.8rem] font-bold text-center">Address book</p>
      </section>

      <section className="flex p-8 flex-col h-screen">
        <p className="text-[#aaa] text-center">
          Manage your saved addresses from quick access
        </p>

        <div>
          {accountList.map((items) => {
            return (
              <div className="flex justify-between mt-8 bg-[#1e1e1e] p-8 rounded-xl">
                <p>{items.name}</p>
                <p className="text-[#aaa]">{items.address}</p>
                <aside className="flex gap-8">
                  <button
                    onClick={() => {
                      navigator.clipboard
                        .writeText(items.address)
                        .then(alert("Copied address"));
                    }}
                  >
                    <CopyIcon color={"white"} />
                  </button>

                  <DeleteIcon w={24} color={"white"} />
                </aside>
              </div>
            );
          })}
        </div>

        <button className="mt-auto bg-[#ffc800] p-6 rounded-xl text-[1.8rem] flex justify-center gap-4">
          <PlusIcon w={24} color={"white"} />
          Add New Address
        </button>
      </section>
    </MobileLayout>
  );
};

export default AddressBook;
