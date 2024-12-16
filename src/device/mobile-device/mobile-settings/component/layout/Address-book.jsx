import { Link } from "react-router-dom";
import AddressBookIcon from "../../../../../assets/icons/address-book";
import PlusIcon from "../../../../../assets/icons/Plus";

const AddressBookLayout = () => {
  return (
    <div className=" border-b-[0.2rem] border-[#4d4d4d] pb-8">
      <p className=" mt-8 mx-8 text-[1.8rem] font-medium">Address Book</p>

      <div className="mt-8 mx-8 bg-[#2E2E2E] rounded-2xl">
        <Link to={"/address-wallet"} className="flex gap-8 items-center pl-8">
          <AddressBookIcon w={24} color={"white"} />
          <p className="border-b-[0.2rem] border-[#4d4d4d] py-6 w-full">
            Address wallet
          </p>
        </Link>

        <Link
          to={"/create-new-wallet"}
          className="flex gap-8 items-center pl-8"
        >
          <PlusIcon w={24} color={"white"} />
          <p className=" py-6 w-full">Add new wallet</p>
        </Link>
      </div>
    </div>
  );
};

export default AddressBookLayout;
