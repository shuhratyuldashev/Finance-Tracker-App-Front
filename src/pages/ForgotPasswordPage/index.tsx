// src/pages/ForgotPasswordPage.tsx
import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import LoginButton from "../../components/LoginIcon"; // Предполагаю, что это кнопка
import LanguageSelect from "../../components/LanguageSelect";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

// Типы для шагов
type Step = "EMAIL" | "CODE" | "NEW_PASSWORD" | "SUCCESS";

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // --- СОСТОЯНИЕ (STATE) ---
  const [currentStep, setCurrentStep] = useState<Step>("EMAIL"); // Начинаем с Email, или поставьте 'CODE' для теста
  const [isLoading, setIsLoading] = useState(false);
  
  // Данные формы
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- ЛОГИКА ПРОГРЕСС-БАРА ---
  // Вычисляем ширину полоски в зависимости от шага
  const getProgressWidth = () => {
    switch (currentStep) {
      case "EMAIL": return "33%";
      case "CODE": return "66%";
      case "NEW_PASSWORD": return "100%";
      default: return "100%";
    }
  };

  // --- ОБРАБОТЧИКИ (HANDLERS) ---

  // Шаг 1: Отправка Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация запроса к API
    setTimeout(() => {
      console.log(`Code sent to ${email}`);
      setIsLoading(false);
      setCurrentStep("CODE"); // Переход к шагу с кодом
    }, 1000);
  };

  // Шаг 2: Проверка кода (Как на скриншоте)
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитация проверки кода
    setTimeout(() => {
      if (code.length >= 4) { // Простая валидация
        console.log("Code verified");
        setIsLoading(false);
        setCurrentStep("NEW_PASSWORD"); // Переход к смене пароля
      } else {
        setIsLoading(false);
        alert("Неверный код");
      }
    }, 1000);
  };

  // Шаг 3: Сохранение нового пароля
  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    setIsLoading(true);
    // Имитация сохранения
    setTimeout(() => {
      console.log("Password changed");
      setIsLoading(false);
      setCurrentStep("SUCCESS"); // Успех
      // Можно сразу редиректить: navigate('/login');
    }, 1000);
  };

  // --- РЕНДЕРИНГ ФОРМЫ В ЗАВИСИМОСТИ ОТ ШАГА ---
  const renderFormStep = () => {
    switch (currentStep) {
      case "EMAIL":
        return (
          <form onSubmit={handleSendEmail} className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-center md:text-left">
              {t("forgot_password.enter_email_desc", "Введите ваш Email, чтобы получить код сброса.")}
            </p>
            <InputField
              id="email"
              label={t("forgot_password.email_label", "Email")}
              type="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
            <LoginButton onClick={handleSendEmail} disabled={isLoading}>
               {isLoading ? "..." : t("forgot_password.send_code_btn", "Получить код")}
            </LoginButton>
          </form>
        );

      case "CODE":
        return (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-center md:text-left">
              {t("forgot_password.enter_code_desc", "Введите код, который мы прислали вам на почту.")}
            </p>
            <InputField
              id="code"
              label={t("forgot_password.code_label", "Код")}
              type="text"
              value={code}
              onChange={(e: any) => setCode(e.target.value)}
              placeholder="1234"
              required
            />
            <LoginButton onClick={() => {}} disabled={isLoading}>
              {isLoading ? "..." : t("forgot_password.verify_code_btn", "Проверить код")}
            </LoginButton>
            
            <button 
              type="button" 
              onClick={() => setCurrentStep("EMAIL")}
              className="w-full text-sm text-blue-500 hover:underline mt-2"
            >
              {t("forgot_password.wrong_email", "Не тот Email?")}
            </button>
          </form>
        );

      case "NEW_PASSWORD":
        return (
          <form onSubmit={handleSavePassword} className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-center md:text-left">
              {t("forgot_password.new_pass_desc", "Придумайте новый сложный пароль.")}
            </p>
            <InputField
              id="newPassword"
              label={t("forgot_password.new_pass_label", "Новый пароль")}
              type="password"
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
              required
            />
            <InputField
              id="confirmPassword"
              label={t("forgot_password.confirm_pass_label", "Повторите пароль")}
              type="password"
              value={confirmPassword}
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              required
            />
            <LoginButton disabled={isLoading} onClick={handleSavePassword}>
              {isLoading ? "..." : t("forgot_password.save_pass_btn", "Сохранить пароль")}
            </LoginButton>
          </form>
        );

      case "SUCCESS":
        return (
          <div className="text-center space-y-6">
            <div className="text-green-500 text-5xl">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("forgot_password.success_title", "Пароль изменен!")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("forgot_password.success_desc", "Теперь вы можете войти с новым паролем.")}
            </p>
            <Link to="/login" className="block w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">
              {t("forgot_password.login_now", "Войти")}
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white dark:bg-gray-900">
      {/* Левая колонка - Основной контент */}
      <div className="flex flex-col items-center w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md mt-10 md:mt-20">
          
          {/* Заголовок */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 text-center md:text-left">
            {t("forgot_password.title", "Сброс пароля")}
          </h1>

          {/* Прогресс-бар (как синяя полоска на скриншоте) */}
          {currentStep !== "SUCCESS" && (
            <div className="w-full bg-gray-200 h-1.5 rounded-full mb-8 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500 ease-in-out"
                style={{ width: getProgressWidth() }}
              ></div>
            </div>
          )}

          {/* Рендер текущего шага формы */}
          {renderFormStep()}

          {/* Ссылка "Вернуться назад", если не успех */}
          {currentStep !== "SUCCESS" && (
            <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center justify-center gap-2 transition"
              >
                ← {t("forgot_password.back_to_login", "Вернуться ко входу")}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Правая колонка - Картинка (без изменений) */}
      <div
        style={{
          backgroundImage: "url(/backee.webp)", // Проверьте путь к картинке
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="hidden md:flex md:w-1/2 relative justify-end p-6"
      >
        <div className="absolute top-6 right-6 flex space-x-3">
          <LanguageSelect />
        </div>

        <div className="absolute bottom-6 right-6 text-white text-2xl font-bold opacity-70">
          FT
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;