import LanguageSelect from "../LanguageSelect";
import type { Transaction } from "../types";
import DateNavigator from "./DateNavigator";

interface HeaderProps {
  page: "dashboard" | "incomes" | "expenses";
  transactions: Transaction[];
}


const Header = ({ page, transactions }: HeaderProps) => {
  const totalIncome = transactions
    .filter((tr) => tr.type === "income")
    .reduce((acc, tr) => acc + tr.amount, 0);
  const totalExpenses = transactions
    .filter((tr) => tr.type === "expense")
    .reduce((acc, tr) => acc + tr.amount, 0);
  const totalBudget = totalIncome - totalExpenses;
  return (
    <div className={`lg:flex flex-col items-center gap-3 justify-between mb-8`}>
      <div
        className={`
    flex flex-wrap items-center bg-white dark:bg-gray-800 w-full p-2 rounded-md gap-4
`}
      >
        {/* 1. Заменили 'space-x-4' на 'gap-4' (лучше работает с flex-wrap).
      2. Добавили 'flex-wrap', чтобы элементы могли переноситься на новую строку.
    */}

        {/* Группа 1: Date Picker (обернут в div, чтобы быть единым блоком) */}
        <DateNavigator
          defaultDate={new Date(2025, 10)}
          onDateChange={(date) => console.log("Selected:", date)}
          locale="ru-RU"
        />
        {/* Группа 2: Ваш Бюджет (КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ) */}
        <div
          className={`
       text-white px-6 py-3 rounded-lg 
        w-full lg:w-auto
        ${totalBudget >= 0 ? "bg-blue-600" : "bg-red-500"}
    `}
        >
          <div className="text-sm">Ваш бюджет:</div>
          <div className="text-xl font-bold">
            {totalBudget}$ - {totalBudget * 11000} UZS
          </div>
        </div>

        {page === "incomes" && (
          <div
            className={`
        ${totalBudget >= 0 ? "bg-blue-500/25 text-blue-500" : "bg-red-500/25 text-red-500"}
        px-6 py-3 rounded-lg 
        w-full lg:w-auto
    `}
          >
            <div className="text-sm">Доход за месяц:</div>
            <div className="text-xl font-bold">
              {totalIncome}$ - {totalIncome * 11000} UZS
            </div>
          </div>
        )}

        {page === "expenses" && (
          <div
            className={`
            ${totalBudget >= 0 ? "bg-blue-500/25 text-blue-500" : "bg-red-500/25 text-red-500"}
    px-6 py-3 rounded-lg 
        w-full lg:w-auto
    `}
          >
            <div className="text-sm">Расходы за месяц:</div>
            <div className="text-xl font-bold">
              {" "}
              {totalExpenses}$ - {totalExpenses * 11000} UZS
            </div>
          </div>
        )}

        {/* Группа 3: Кнопки (ml-auto теперь работает корректно) */}
        <div className="hidden lg:flex items-center ml-auto space-x-4">
          <LanguageSelect />
        </div>
      </div>
    </div>
  );
};

export default Header;
