/** @type {import('tailwindcss').Config} */
export default {
  // Указываем, где Tailwind должен искать классы
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // !!! Это самая важная строка для вас !!!
  // Она говорит Tailwind, что темный режим нужно активировать,
  // когда у родительского элемента (мы будем использовать <html>) есть класс 'dark'.
  darkMode: 'class', 
  
  theme: {
    extend: {},
  },
  plugins: [],
}