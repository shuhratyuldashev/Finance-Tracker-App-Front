import React from "react";
import { Pen, Trash } from "lucide-react";
import { useTransactionModals } from "./TransactionsModals";
import type { Transaction } from "../types";

interface TransactionsListProps {
  transactions: Transaction[];
  onDeleteTransaction: any;
  onEditTransaction: any;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) => {
  const { openModal, EditModal, DeleteModal, ViewModal } =
    useTransactionModals();

  if(transactions ? transactions.length > 0 : false) {
    return (
    <>
      <div className="space-y-3 mt-6">
        {transactions.map((tr) => (
          <div
            key={tr.id}
            onClick={() => openModal("view", tr)}
            className="flex items-center justify-between bg-white hover:shadow-lg shadow-blue-600/15 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-3 rounded-lg transition duration-150 cursor-pointer"
          >
            <div className="flex gap-4 items-center justify-between">
              <div className="text-blue-500 font-semibold text-sm">
                {tr.date}
              </div>
              <div className="text-sm px-2 py-1 rounded-full flex text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-600">
                {tr.category}
              </div>
            </div>
            <div
              className={`font-semibold text-sm text-right w-1/3 ${
                tr.type === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {tr.amount} $ - {tr.amount * 11000} UZS
            </div>
            <div className="hidden md:flex text-blue-500 items-center gap-2">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("edit", tr);
                }}
                className="hover:bg-gray-200 p-1.5 rounded dark:hover:bg-black duration-300 cursor-pointer"
              >
                <Pen size={16} />
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("delete", tr);
                }}
                className="hover:bg-gray-200 p-1.5 rounded dark:hover:bg-black duration-300 cursor-pointer"
              >
                <Trash size={16} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Подключаем все модалки */}
      <EditModal onEdit={onEditTransaction}/>
      <DeleteModal onDelete={onDeleteTransaction}/>
      <ViewModal />
    </>
  );
  }

  return (
    <div className="flex items-center justify-center h-30">
      <p>Нет транзакций</p>
    </div>
  );
};

export default TransactionsList;
