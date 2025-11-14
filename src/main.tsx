// src/main.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
// Просто импортируем конфигурацию i18next
import "./i18n";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  // i18next автоматически предоставляет контекст
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
