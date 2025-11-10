// src/pages/LoginPage.tsx
import React from 'react'; // Убрали useState для языка
import InputField from '../../components/InputField';
import LoginButton from '../../components/LoginIcon';
import LanguageSelect from '../../components/LanguageSelect'; 
import { Moon, Sun } from 'lucide-react'; 
import { useTheme } from '../../context/ThemeContext'; 
import { useTranslation } from 'react-i18next'; // <-- Импорт

const LoginPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme(); 
  const { t } = useTranslation(); // <-- Получаем функцию перевода

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting to log in.');
  };

  const handleRegister = () => {
    console.log('Redirecting to registration page...');
  };
  
  // УДАЛЕНА вся логика управления языком (она в LanguageSelect)

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white dark:bg-gray-900">
      {/* Левая колонка - Форма входа */}
      <div className="flex flex-col items-center w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Заголовок */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center md:text-left">
            {t('login.title')} {/* <-- Перевод */}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 text-base text-center md:text-left">
            {t('login.description')} {/* <-- Перевод */}
          </p>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="login"
              label={t('login.login_label')}
              type="text"
              placeholder=""
              required
            />
            <InputField
              id="password"
              label={t('login.password_label')} 
              type="password"
              placeholder=""
              required
              forgotPasswordLink={true}
            />

            <LoginButton onClick={handleSubmit}>
              {t('login.button_submit')}
            </LoginButton>
          </form>

          {/* Ссылка на регистрацию */}
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            {t('login.no_account_part1')} {/* <-- Перевод */}
            <a onClick={handleRegister} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium cursor-pointer">
              {t('login.no_account_part2')} {/* <-- Перевод */}
            </a>
          </div>
        </div>
      </div>
      
      {/* Правая колонка - Красный фон с кнопками */}
      <div className="hidden md:flex md:w-1/2 bg-red-600 relative justify-end p-6">
        <div className="absolute top-6 right-6 flex space-x-3">
          
          <LanguageSelect />

          {/* Кнопка Часы (Тема) */}
          <button 
            onClick={toggleDarkMode} 
            className="cursor-pointer flex items-center justify-center p-2 bg-white bg-opacity-30 backdrop-blur-sm rounded-full hover:bg-opacity-50 transition duration-200"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="absolute bottom-6 right-6 text-white text-2xl font-bold opacity-70">
          FT
        </div>
      </div>
    </div>
  );
};

export default LoginPage;