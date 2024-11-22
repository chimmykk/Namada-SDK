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
        className="flex justify-between items-center p-[1.2rem] bg-[#1e1e1e] my-[0.5rem] text-white rounded-md gap-3 xxsm:flex-wrap xxsm:justify-start"
        style={{ boxShadow: "0 0.4rem 1rem rgba(0, 0, 0, 0.15)" }}
      >
        <span>{item.name}</span>
        <span className="text-left text-[#8e8e8e] xxsm:m-auto">
          {item.address}
        </span>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText(item.address)
              .then(alert("Copied address"));
          }}
          className="bg-[#3a6ea5] py-[0.8rem] px-[1.2rem] rounded-md text-[1.4rem] hover:bg-[#5084c2]"
          style={{ transition: "all 0.3s ease" }}
        >
          Copy
        </button>

        <button
          className="bg-[#a53a3a] py-[0.8rem] px-[1.2rem] rounded-md text-[1.4rem] hover:bg-[#c25252]"
          style={{ transition: "all 0.3s ease" }}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div>
      <h1 className="text-[2.4rem] font-bold mb-[1rem] text-[#e0e0e0] w-fit">
        Address Book
      </h1>
      <p className="text-[#c7c7c7]">
        Manage your saved addresses for quick access.
      </p>

      <div className="flex flex-col mt-[1.5rem]">{accoutList}</div>

      <button
        className="bg-[#3a6ea5] px-[1.8rem] p-[1rem] rounded-md font-bold mt-[2rem] hover:bg-[#5084c2]"
        style={{ transition: "all 0.3s ease" }}
      >
        + Add New Address
      </button>
    </div>
  );
}

export default AddressBook;
