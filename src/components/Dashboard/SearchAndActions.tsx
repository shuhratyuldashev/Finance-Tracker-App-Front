import React from 'react';
import { Search, Plus, ListFilter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTransactionModals } from './TransactionsModals';

const SearchAndActions: React.FC = () => { 
  const { t } = useTranslation();
  const { openModal, CreateModal, CategoryModal } = useTransactionModals();
  
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-6 items-center justify-between mb-4">
        {/* Поиск с иконкой фильтра на мобильных */}
        <div className="flex col-span-4 mb-4 lg:mb-0 items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg flex-1 mr-3">
          <ListFilter size={20} className="text-blue-500 sm:hidden" /> 
          <Search size={20} className="text-gray-400 hidden sm:block" />
          <input
            type="text"
            placeholder={t('dashboard.search_placeholder')}
            className="flex-1 outline-none py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        
        {/* Кнопки действий */}
        <button 
          onClick={() => openModal("create")}
          className="flex items-center space-x-1 bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Транзакцию</span>
          <span className="inline sm:hidden">Транз.</span>
        </button>

        <button 
          onClick={() => openModal("category")}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg ml-4"
        >
          <Plus size={20} />
          <span>{t('dashboard.sort_category')}</span>
        </button>
      </div>

      {/* Подключаем сами модалки */}
      <CreateModal />
      <CategoryModal />
    </>
  );
};

export default SearchAndActions;
