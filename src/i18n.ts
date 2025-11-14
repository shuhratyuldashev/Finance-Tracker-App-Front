// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Импортируем JSON с переводами
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";

// --- ИНЛАЙН ПЕРЕВОДОВ (для гарантии, что они загружены) ---
const resources = {
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
};
// -------------------------------------------------------------

i18n.use(initReactI18next).init({
  resources,
  // Используем 'ru' или сохраненный язык.
  // i18next сам проверяет localStorage по ключу 'i18nextLng'.
  lng: localStorage.getItem("i18nextLng") || "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  // Важно: всегда используем двухбуквенный код для соответствия нашим JSON ключам.
  load: "languageOnly",
});

export default i18n;
