import DownRightIcon from "../../assets/icons/DownRightIcon";
import UpRightIcon from "../../assets/icons/up-right";

const transactionList = [
  {
    name: "Meshil",
    type: "Send",
    transactionStatus: "Pending",
    date: "Dec, 02, 2024",
    price: 0.74,
  },
  {
    name: "Ava",
    type: "Receive",
    transactionStatus: "Completed",
    date: "Dec, 01, 2024",
    price: 1.25,
  },
  {
    name: "Noah",
    type: "Send",
    transactionStatus: "Failed",
    date: "Nov, 30, 2024",
    price: 0.89,
  },
  {
    name: "Emma",
    type: "Receive",
    transactionStatus: "Pending",
    date: "Nov, 29, 2024",
    price: 2.15,
  },
  {
    name: "Liam",
    type: "Receive",
    transactionStatus: "Completed",
    date: "Nov, 28, 2024",
    price: 0.5,
  },
  {
    name: "Olivia",
    type: "Receive",
    transactionStatus: "Failed",
    date: "Nov, 27, 2024",
    price: 1.8,
  },
  {
    name: "Sophia",
    type: "Send",
    transactionStatus: "Pending",
    date: "Nov, 26, 2024",
    price: 0.98,
  },
  {
    name: "James",
    type: "Receive",
    transactionStatus: "Completed",
    date: "Nov, 25, 2024",
    price: 3.2,
  },
  {
    name: "Mia",
    type: "Send",
    transactionStatus: "Failed",
    date: "Nov, 24, 2024",
    price: 1.1,
  },
  {
    name: "Ethan",
    type: "Receive",
    transactionStatus: "Pending",
    date: "Nov, 23, 2024",
    price: 0.65,
  },
];

const transactionStatus = {
  complete: "Completed",
  pending: "Pending",
  failed: "Failed",

  statusColor: {
    Completed: "bg-[green]",
    Pending: "bg-[gray]",
    Failed: "bg-[red]",
  },
};

const transactionType = {
  send: "Send",
  receive: "Receive",
};

const transaction = transactionList.map((items) => {
  return (
    <div
      key={items.name}
      className="grid grid-cols-[auto,auto,1fr] w-full h-full gap-x-8"
    >
      <div className="bg-[#FFC800] p-4 rounded-full w-fit h-fit row-span-2">
        {items.type === transactionType.send ? (
          <DownRightIcon />
        ) : (
          <UpRightIcon />
        )}
      </div>

      {items.type === transactionType.send ? (
        <p>Receive from {items.name}</p>
      ) : (
        <p>Send to {items.name}</p>
      )}

      <p className="ml-auto">
        {items.type === transactionType.send ? "+" : "-"}0.75 NAM
      </p>
      <p className="text-[1.2rem] text-[#c7c7c7]">{items.date}</p>

      <div className="flex items-center gap-2 ml-auto">
        <div
          className={`w-3 h-3 rounded-full ${
            transactionStatus.statusColor[items.transactionStatus]
          }`}
        ></div>

        <p className="text-[1.3rem] text-[#c7c7c7]">
          {items.transactionStatus}
        </p>
      </div>
    </div>
  );
});

const Transaction = () => {
  return (
    <div className="flex flex-col  gap-8 mt-8 mb-0 h-[42rem] overflow-y-auto">
      {transaction}
    </div>
  );
};
export default Transaction;
