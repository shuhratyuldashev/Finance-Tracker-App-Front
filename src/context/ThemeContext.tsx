// src/context/ThemeContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 1. ИСПРАВЛЕННАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ
const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;

  // 1. Приоритет: Проверяем localStorage
  //    (Если пользователь УЖЕ нажимал на кнопку)
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme === "dark";
  }

  // 2. Только если в localStorage пусто, проверяем системные настройки
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  return systemPrefersDark;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 2. Инициализируем состояние с помощью исправленной функции
  const [darkMode, setDarkMode] = useState<boolean>(getInitialTheme);

  // 3. Этот useEffect отвечает за применение темы (на <html>)
  //    и сохранение выбора в localStorage.
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // Этот хук запускается каждый раз, когда меняется `darkMode`
  }, [darkMode]);

  // 4. Эта функция-переключатель. Она просто меняет состояние.
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode) => !prevMode);
  }, []); // Пустой массив зависимостей здесь - это нормально

  const value = { darkMode, toggleDarkMode };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 5. Хук useTheme (без изменений)
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
