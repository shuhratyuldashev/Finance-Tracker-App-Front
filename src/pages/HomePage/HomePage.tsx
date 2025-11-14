import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import SearchAndActions from "../../components/Dashboard/SearchAndActions";
import TransactionsList from "../../components/Dashboard/TransactionsList";
import { useTransactionsFilter } from "../../components/lib/useTransactionsFilter";
import { SortFilterPanel } from "../../components/Dashboard/SortButtons";
import Charts from "../../components/Dashboard/Charts";
import type { Transaction } from "../../components/types"; // Correct import of the interface
import { useState } from "react";

interface FinanceTrackerPageProps {
  page: "dashboard" | "incomes" | "expenses";
}

const FinanceTrackerPage = ({ page }: FinanceTrackerPageProps) => {
  // FIX: Simplified amount values to remove currency symbols and signs.
  // The component consuming this data (TransactionsList or Charts) should
  // handle the formatting based on the 'type' field.
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2025-11-01",
      amount: 100,
      category: "Salary",
      type: "income",
    },
    {
      id: 2,
      date: "2025-11-02",
      amount: 50,
      category: "Food",
      type: "expense",
    },
    {
      id: 3,
      date: "2025-11-03",
      amount: 200,
      category: "Freelance",
      type: "income",
    },
    {
      id: 4,
      date: "2025-11-04",
      amount: 120,
      category: "Shopping",
      type: "expense",
    },
    {
      id: 5,
      date: "2025-11-05",
      amount: 30,
      category: "Transport",
      type: "expense",
    },
    {
      id: 6,
      date: "2025-11-06",
      amount: 400,
      category: "Investment",
      type: "income",
    },
  ]);

  const filter = useTransactionsFilter(transactions);

  const handleAddTransaction = ({
    amount,
    type,
    category,
  }: {
    amount: number;
    type: "income" | "expense";
    category: string;
  }) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split("T")[0],
      amount,
      category,
      type,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const handleEditTransaction = ({
    id,
    amount
  }: {
    id: number;
    amount: number;
  }) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === id) {
        return {
          ...transaction,
          amount,
        };
      }
      return transaction;
    });
    setTransactions(updatedTransactions);
  }

  const handleDeleteTransaction = (id: number) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Sidebar />

      <div className="flex-1 overflow-auto p-4 lg:p-8">
        <Header transactions={transactions} page={page} />
        <Charts type={page} />
        <SearchAndActions onAddTransaction={handleAddTransaction} />

        <SortFilterPanel filter={filter} />
        <TransactionsList onDeleteTransaction={handleDeleteTransaction} onEditTransaction={handleEditTransaction} transactions={filter.filteredAndSortedTransactions} />
      </div>
    </div>
  );
};

export default FinanceTrackerPage;
