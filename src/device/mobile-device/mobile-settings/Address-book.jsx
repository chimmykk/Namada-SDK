import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/arrow-left";
import CopyIcon from "../../../assets/icons/copy";
import MobileLayout from "../../../components/layout/mobile-layout";
import PlusIcon from "../../../assets/icons/Plus";
import DeleteIcon from "../../../assets/icons/delete";
import EditIcon from "../../../assets/icons/edit";

const AddressBook = () => {
  const [accountList, setAccountList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/account.json")
      .then((res) => res.json())
      .then((data) => setAccountList(data))
      .catch((err) => console.log("Something when wrong", err));
  }, []);

  return (
    <MobileLayout>
      <section className="grid grid-cols-[1fr,10fr,1fr] p-8 px-8">
        <Link preventScrollReset to={"/mobile/setting"}>
          <ArrowLeftIcon color={"currentColor"} w={20} />
        </Link>
        <p className="text-[1.8rem] font-bold text-center">Address book</p>
      </section>

      <section className="flex p-8 flex-col h-screen">
        <p className="text-secondary text-center">
          Manage your saved addresses from quick access
        </p>

        <div>
          {accountList.map((items) => {
            return (
              <div
                key={items.name}
                className="flex justify-between flex-col mt-8 bg-secondary p-8 rounded-xl"
              >
                <p>{items.name}</p>

                <div className="flex w-full justify-between">
                  <p className="text-[#aaa]">{items.address}</p>
                  <aside className="flex gap-4">
                    <EditIcon w={24} color={"currentColor"} />
                    <button
                      onClick={() => {
                        navigator.clipboard
                          .writeText(items.address)
                          .then(alert("Copied address"));
                      }}
                    >
                      <CopyIcon color={"currentColor"} />
                    </button>

                    <DeleteIcon w={24} color={"currentColor"} />
                  </aside>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mt-auto bg-[#ffc800] p-6 rounded-xl text-[1.8rem] flex justify-center gap-4">
          <PlusIcon w={24} color={"currentColor"} />
          Add New Address
        </button>
      </section>
    </MobileLayout>
  );
};

export default AddressBook;
