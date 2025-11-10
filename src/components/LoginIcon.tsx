import React from 'react';
import { LogIn } from 'lucide-react';

interface LoginButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-full px-4 py-3 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition duration-300 shadow-md"
    >
      <LogIn className="w-5 h-5 mr-2" />
      {children}
    </button>
  );
};

export default LoginButton;