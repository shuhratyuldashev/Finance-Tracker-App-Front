import React from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import LanguageSelect from '../LanguageSelect';
import DateNavigator from './DateNavigator';

interface HeaderProps {
  page: 'dashboard' | 'incomes' | 'expenses';
}


const Header = ({ page }: HeaderProps) => {
  const { darkMode, toggleDarkMode } = useTheme(); 

  return (
    <div className={`lg:flex flex-col items-center gap-3 justify-between mb-8`}>
     <div className={`
    flex flex-wrap items-center bg-white dark:bg-gray-800 w-full p-2 rounded-md gap-4
`}>
    {/* 1. Заменили 'space-x-4' на 'gap-4' (лучше работает с flex-wrap).
      2. Добавили 'flex-wrap', чтобы элементы могли переноситься на новую строку.
    */}
    
    {/* Группа 1: Date Picker (обернут в div, чтобы быть единым блоком) */}
   <DateNavigator
      defaultDate={new Date(2025, 10)} 
      onDateChange={(date) => console.log('Selected:', date)} 
      locale="ru-RU"
    />
    {/* Группа 2: Ваш Бюджет (КЛЮЧЕВЫЕ ИЗМЕНЕНИЯ) */}
    <div className={`
        bg-blue-500 text-white px-6 py-3 rounded-lg 
        w-full lg:w-auto
    `}>
        <div className="text-sm">Ваш бюджет:</div>
        <div className="text-xl font-bold">100$ - 1,000,000 UZS</div>
    </div>

    {page === "incomes" && <div className={`
        bg-blue-500/25 text-blue-500  px-6 py-3 rounded-lg 
        w-full lg:w-auto
    `}>
        <div className="text-sm">Доход за месяц:</div>
        <div className="text-xl font-bold">100$ - 1,000,000 UZS</div>
    </div>}

    {page === "expenses" && <div className={`
        bg-blue-500/25 text-blue-500 px-6 py-3 rounded-lg 
        w-full lg:w-auto
    `}>
        <div className="text-sm">Расходы за месяц:</div>
        <div className="text-xl font-bold">100$ - 1,000,000 UZS</div>
    </div>}

    {/* Группа 3: Кнопки (ml-auto теперь работает корректно) */}
    <div className="hidden lg:flex items-center ml-auto space-x-4">
        <LanguageSelect />
        <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700`}
        >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-500" />}
        </button>
    </div>
</div>
    </div>
  );
};

export default Header;