import { useEffect } from 'react';
import { Moon, Sun, Copy, Edit2, Palette, Languages } from 'lucide-react';
import Sidebar from '../../components/Dashboard/Sidebar';
import { useTheme } from '../../context/ThemeContext';
import LanguageSelect from '../../components/LanguageSelect';

const ProfileSettings = () => {

  const { darkMode, toggleDarkMode } = useTheme(); 
  
  // Эффект для применения класса 'dark' к самому верхнему элементу
  // чтобы активировать dark: стили для всего приложения.
  // Я применяю его к главному контейнеру настроек.
  // В реальном приложении это часто делается на <html> или <body>.
  useEffect(() => {
    const mainContainer = document.getElementById('profile-settings-main');
    if (mainContainer) {
      if (darkMode) {
        mainContainer.classList.add('dark');
      } else {
        mainContainer.classList.remove('dark');
      }
    }
  }, [darkMode]);


  return (
    <div className='flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <Sidebar />
      {/* Главный контейнер для настроек. Класс 'dark' будет добавлен сюда. */}
      <div id="profile-settings-main" className="flex-1 overflow-auto p-4 lg:p-8 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">

      <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Профиль
          </h1>
          <div className="flex gap-2">
            <LanguageSelect />
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 flex items-center justify-center overflow-hidden">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-700"></div>
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">
                Аватарка
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Форматы: JPEG, PNG, WEBP, GIF. Макс. размер: 10 МБ.
              </p>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Ваш логин
          </h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-gray-900/50 transition-colors">
            <span className="text-blue-500 font-medium">John Doe</span>
            <button className="p-1.5 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Copy size={18} className="text-blue-500" />
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Аккаунт
          </h3>
          
          {/* Email */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500">
                <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                Почта
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ваша учетная запись к адресу <span className="text-blue-500">JohnDoe82@gmail.com</span>
              </p>
            </div>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Edit2 size={18} className="text-blue-500" />
            </button>
          </div>

          {/* Password */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-500">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                Пароль
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Пароль — ключ к вашей учетной записи. Никому его не сообщайте. При необходимости вы можете изменить его здесь для повышения безопасности.
              </p>
            </div>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Edit2 size={18} className="text-blue-500" />
            </button>
          </div>
        </div>

        {/* System Section */}
        <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Система
          </h3>
          
          {/* Theme */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Palette size={20} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                Тема
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Настройте внешний вид приложения — выберите светлую или тёмную тему.
              </p>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {darkMode ? <Sun size={18} className="text-blue-500" /> : <Moon size={18} className="text-blue-500" />}
            </button>
          </div>

          {/* Language */}
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Languages size={20} className="text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                Язык
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Выберите язык интерфейса для удобства использования.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-blue-500 dark:bg-gray-900/50 dark:text-blue-400 transition-colors">
              {language}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="rounded-2xl p-6 border-2 bg-white border-red-200 dark:bg-gray-800/50 dark:border-red-900/30 transition-colors">
          <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
            Действия
          </h3>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                Выход
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Завершите сеанс, чтобы выйти из аккаунта на этом устройстве.
              </p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-xl transition-colors w-full md:w-auto">
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default ProfileSettings;