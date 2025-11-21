import { useEffect } from "react";
import { Edit2, Languages, Save } from "lucide-react";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useTheme } from "../../context/ThemeContext";
import LanguageSelect from "../../components/LanguageSelect";
import { useUserAccountModals } from "../../components/User/UserAccountModals";
import { useTranslation } from "react-i18next";


const ProfileSettings = () => {
  const { darkMode } = useTheme();
  const { t } = useTranslation();
  const {
    openModal,
    ChangeEmailModal,
    ChangePasswordModal,
    LogoutConfirmModal,
  } = useUserAccountModals();

  useEffect(() => {
    const mainContainer = document.getElementById("profile-settings-main");
    if (mainContainer) {
      if (darkMode) {
        mainContainer.classList.add("dark");
      } else {
        mainContainer.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Sidebar />
      <div
        id="profile-settings-main"
        className="flex-1 overflow-auto p-4 lg:p-8 transition-colors duration-300 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
              {t('profile.title')}
            </h1>
            <div className="flex gap-2">
              <LanguageSelect />
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
                  {t('profile.avatar.title')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('profile.avatar.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Login Section */}
          <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {t('profile.login')}
            </h3>
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-gray-900/50 transition-colors">
              <span className="text-blue-500 font-medium">John Doe</span>
              <button className="p-1.5 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Save size={20} className="text-blue-500" />
              </button>
            </div>
          </div>

          {/* Account Section */}
          <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {t('profile.account.title')}
            </h3>

            {/* Email */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-blue-500"
                >
                  <rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                  {t('profile.account.email_title')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('profile.account.email_description')}{" "}
                  <span className="text-blue-500">JohnDoe82@gmail.com</span>
                </p>
              </div>
              <button
                onClick={() => openModal("email")}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Edit2 size={18} className="text-blue-500" />
              </button>
            </div>

            {/* Password */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-blue-500"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                  {t('profile.account.passowrd_title')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('profile.account.passowrd_description')}
                </p>
              </div>
              <button
                onClick={() => openModal("password")}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Edit2 size={18} className="text-blue-500" />
              </button>
            </div>
          </div>

          {/* System Section */}
          <div className="rounded-2xl p-6 mb-6 bg-white dark:bg-gray-800 transition-colors">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {t('profile.system.title')}
            </h3>

            {/* Language */}
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Languages size={20} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                  {t('profile.system.language_title')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('profile.system.language_description')}
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-blue-500 dark:bg-gray-900/50 dark:text-blue-400 transition-colors">
                <LanguageSelect />
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="rounded-2xl p-6 border-2 bg-white border-red-200 dark:bg-gray-800/50 dark:border-red-900/30 transition-colors">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              {t('profile.actions.title')}
            </h3>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-medium mb-1 text-gray-900 dark:text-white">
                  {t('profile.actions.logout')}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('profile.actions.logout_description')}
                </p>
              </div>
              <button
                onClick={() => openModal("logout")}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-xl transition-colors w-full md:w-auto"
              >
                {t('profile.actions.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Модалки — вне разметки страницы */}
      <ChangeEmailModal />
      <ChangePasswordModal />
      <LogoutConfirmModal />
    </div>
  );
};

export default ProfileSettings;
