import React from "react";
import { Pen, Trash } from "lucide-react";
import { useTransactionModals } from "./TransactionsModals";

interface Transaction {
  id: number;
  date: string;
  amount: string;
  category: string;
  type: "income" | "expense";
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const {
    openModal,
    EditModal,
    DeleteModal,
    ViewModal,
  } = useTransactionModals();

  return (
    <>
      <div className="space-y-3 mt-6">
        {transactions.map((tr) => (
          <div
            key={tr.id}
            onClick={() => openModal("view", tr)}
            className="flex items-center justify-between bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-3 rounded-lg transition duration-150 cursor-pointer"
          >
            <div className="text-blue-500 font-semibold text-sm w-1/3">{tr.date}</div>
            <div
              className={`font-semibold text-sm text-right w-1/3 ${
                tr.type === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {tr.amount}
            </div>
            <div className="hidden md:flex text-gray-700 dark:text-gray-400 flex-1 justify-end mr-4">
              {tr.category}
            </div>
            <div className="hidden md:flex text-blue-500 items-center gap-2">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("edit", tr);
                }}
                className="hover:bg-gray-200 p-1 rounded dark:hover:bg-black duration-300 cursor-pointer"
              >
                <Pen size={16} />
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("delete", tr);
                }}
                className="hover:bg-gray-200 p-1 rounded dark:hover:bg-black duration-300 cursor-pointer"
              >
                <Trash size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Подключаем все модалки */}
      <EditModal />
      <DeleteModal />
      <ViewModal />
    </>
  );
};

export default TransactionsList;
