import React from "react";
import { Home, TrendingUp, TrendingDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation();

  // --- Функция для кнопок навигации (без изменений) ---
  const getButtonClasses = (path: string) => {
    const isActive = currentPath === path;
    const baseClasses = `flex items-center justify-center p-3 lg:w-full lg:px-4 lg:py-3 rounded-lg transition duration-150`;
    const activeClasses = `bg-blue-500 text-white`;
    const inactiveClasses = `text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700`;
    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  // --- Логика для подсветки профиля ---
  const isProfileActive = currentPath === "/profile";

  // Классы для контейнера профиля
  const profileContainerClasses = `flex items-center justify-around space-x-3 lg:mb-8 p-1 lg:p-2 rounded-md transition duration-150 w-full`;
  const profileActiveClasses = `bg-blue-500 shadow-md`; // Стиль как у активной кнопки
  const profileInactiveClasses = `hover:bg-gray-100 dark:hover:bg-gray-700`;

  // Классы для текста (Имя)
  const nameActiveClasses = `text-white`;
  const nameInactiveClasses = `text-gray-900 dark:text-gray-100`;

  // Классы для текста (Email)
  const emailActiveClasses = `text-blue-100`; // Чуть светлее, чем имя
  const emailInactiveClasses = `text-gray-500 dark:text-gray-400`;

  return (
    <div
      className={`
      bg-white dark:bg-gray-800 lg:p-6 p-2 fixed lg:top-0 lg:h-screen lg:sticky flex lg:flex-col gap-2
       bottom-0 left-0 right-0 shadow-lg lg:shadow-none z-10
      `}
    >
      {/* --- Профиль пользователя (Обновлено) --- */}
      {/* 1. Обертка <Link> теперь имеет w-full
        2. Внутренний <div> использует динамические классы
        3. Текстовые поля внутри также используют динамические классы
      */}
      <Link to="/profile" className="flex items-center">
        <div
          className={`${profileContainerClasses} ${isProfileActive ? profileActiveClasses : profileInactiveClasses}`}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="John Doe"
            className="w-12 h-12 rounded-full"
          />
          <div className="hidden lg:block">
            <div
              className={`font-semibold ${isProfileActive ? nameActiveClasses : nameInactiveClasses}`}
            >
              John Doe
            </div>
            <div
              className={`text-xs ${isProfileActive ? emailActiveClasses : emailInactiveClasses}`}
            >
              JohnDoe82@gmail.com
            </div>
          </div>
        </div>
      </Link>

      {/* --- Навигация (без изменений) --- */}
      <nav className="flex space-x-2 justify-around lg:justify-start lg:space-x-0 lg:space-y-2 lg:flex-col p-2 lg:p-0 w-full">
        <Link className="w-full flex items-center" to="/">
          <button className={getButtonClasses("/")}>
            <Home size={20} />
            <span className="hidden font-medium lg:block ml-3">{t("sidebar.home")}</span>
          </button>
        </Link>

        <Link className="w-full flex items-center" to="/incomes">
          <button className={getButtonClasses("/incomes")}>
            <TrendingUp size={20} />
            <span className="hidden font-medium lg:block ml-6">
                {t("sidebar.incomes")}
              </span>
          </button>
        </Link>

        <Link className="w-full flex items-center" to="/expenses">
          <button className={getButtonClasses("/expenses")}>
            <TrendingDown size={20} />
            <span className="hidden font-medium lg:block ml-6">
                {t("sidebar.expenses")}
            </span>
          </button>
        </Link>
      </nav>

      <div className="absolute bottom-6 hidden lg:block left-6">
        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          FT
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
