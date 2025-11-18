import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfileSettings from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage page="dashboard" />} />
      <Route path="/incomes" element={<DashboardPage page="incomes" />} />
      <Route path="/expenses" element={<DashboardPage page="expenses" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default App;
