// src/components/Dashboard/SortButtons.tsx
import React from 'react';
import { useTranslation } from 'react-i18next'; // <-- Импорт

const SortButtons: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex space-x-2 my-4">
      <button className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white">
        {t('dashboard.sort_date')} {/* "Дата" / "Date" */}
      </button>
      <button className="px-4 py-2 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300">
        {t('dashboard.sort_amount')} {/* "Сумма" / "Amount" */}
      </button>
      <button className="px-4 py-2 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300">
        {t('dashboard.sort_category')} {/* "Категория" / "Category" */}
      </button>
    </div>
  );
};

export default SortButtons;