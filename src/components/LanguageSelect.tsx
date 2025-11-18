// src/components/LanguageSelect.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next"; // <-- Импорт

const LanguageSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Получаем функцию i18n для смены языка и t для переводов
  const { i18n, t } = useTranslation();

  // Языки, которые мы хотим отображать
  const options = [
    { key: "ru", display: t("language", { lng: "ru" }) }, // "Ру"
    { key: "en", display: t("language", { lng: "en" }) }, // "Eng"
  ];

  const handleSelect = (langKey: string) => {
    i18n.changeLanguage(langKey); // <-- Устанавливаем новый язык
    setIsOpen(false);
  };

  const currentLang = i18n.language;

  return (
    <div className="relative z-10">
      {/* Кнопка Select */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center dark:text-white justify-center px-4 py-2 bg-white dark:bg-gray-700 bg-opacity-30 backdrop-blur-sm rounded-full font-bold transition duration-200 hover:bg-opacity-50 focus:outline-none"
      >
        {t("language")}{" "}
        {/* <-- Отображаем "Ру" или "Eng" в зависимости от текущего языка */}
        <ChevronDown
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Выпадающий список */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-16 bg-white dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSelect(option.key)}
              className={`w-full text-center py-2 text-sm font-medium transition duration-150
                ${currentLang === option.key ? "bg-blue-500 text-white" : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"}
              `}
            >
              {option.display}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
