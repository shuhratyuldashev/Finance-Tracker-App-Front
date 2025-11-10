// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- ИНЛАЙН ПЕРЕВОДОВ (для гарантии, что они загружены) ---
const resources = {
  ru: {
    translation: {
      "language": "Ру",
      "login": {
        "title": "Вход",
        "description": "Для входа на сайт используйте вашу почту и пароль, которые были указаны при регистрации на сайте",
        "login_label": "Логин",
        "password_label": "Пароль",
        "button_submit": "Войти",
        "no_account_part1": "Нету аккаунта? - ",
        "no_account_part2": "Зарегистрируйтесь"
      },
      "dashboard": {
        "search_placeholder": "Поиск по транзакциям...",
        "sort_date": "Дата",
        "sort_amount": "Сумма",
        "sort_category": "Категория",
        "add_transaction": "Добавить транзакцию"
      }
    },
  },
  en: {
    translation: {
      "language": "Eng",
      "login": {
        "title": "Login",
        "description": "To enter the site, use your email and password provided during registration.",
        "login_label": "Login",
        "password_label": "Password",
        "button_submit": "Sign In",
        "no_account_part1": "Don't have an account? - ",
        "no_account_part2": "Register"
      },
      "dashboard": {
        "search_placeholder": "Search transactions...",
        "sort_date": "Date",
        "sort_amount": "Amount",
        "sort_category": "Category",
        "add_transaction": "Add Transaction"
      }
    },
  },
};
// -------------------------------------------------------------

i18n
  .use(initReactI18next)
  .init({
    resources,
    // Используем 'ru' или сохраненный язык. 
    // i18next сам проверяет localStorage по ключу 'i18nextLng'.
    lng: localStorage.getItem('i18nextLng') || 'ru', 
    fallbackLng: 'ru', 
    interpolation: {
      escapeValue: false,
    },
    // Важно: всегда используем двухбуквенный код для соответствия нашим JSON ключам.
    load: 'languageOnly', 
  });

export default i18n;