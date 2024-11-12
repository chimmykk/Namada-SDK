import { useState, useEffect } from "react";

function AddressBook() {
  const [account, setAccount] = useState([]);

  // Fetch the account data and set to account
  useEffect(() => {
    fetch("/api/account.json")
      .then((res) => res.json())
      .then((data) => setAccount(data))
      .catch((err) => alert("Can't be fetch the data", err));
  }, []);

  // Display the list of account
  const accoutList = account.map((item) => {
    return (
      <div
        key={item.name}
        className="flex justify-between items-center p-[12px] bg-[#1e1e1e] my-[5px] text-white rounded-md gap-3"
        style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)" }}
      >
        <span>{item.name}</span>
        <span className="text-left text-[#8e8e8e]">{item.address}</span>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText(item.address)
              .then(alert("Copied address"));
          }}
          className="bg-[#3a6ea5] py-[8px] px-[12px] rounded-md text-[14px] hover:bg-[#5084c2]"
          style={{ transition: "all 0.3s ease" }}
        >
          Copy
        </button>

        <button
          className="bg-[#a53a3a] py-[8px] px-[12px] rounded-md text-[14px] hover:bg-[#c25252]"
          style={{ transition: "all 0.3s ease" }}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-[24px] font-bold mb-[10px] text-[#e0e0e0]">
        Address Book
      </h1>
      <p className="">Manage your saved addresses for quick access.</p>

      <div className="flex flex-col mt-[15px]">{accoutList}</div>

      <button
        className="bg-[#3a6ea5] px-[18px] p-[10px] rounded-md font-bold mt-[20px] hover:bg-[#5084c2]"
        style={{ transition: "all 0.3s ease" }}
      >
        + Add New Address
      </button>
    </div>
  );
}

export default AddressBook;
