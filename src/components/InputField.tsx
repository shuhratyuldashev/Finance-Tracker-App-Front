import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  forgotPasswordLink?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  forgotPasswordLink = false,
  ...props
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        {/* Добавили dark:text-gray-300 */}
        <label
          htmlFor={id}
          className="text-gray-700 dark:text-gray-300 font-semibold text-base"
        >
          {label}
        </label>
        {forgotPasswordLink && (
          // Добавили dark: классы для ссылки
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            Забыли пароль?
          </a>
        )}
      </div>
      <input
        id={id}
        {...props}
        // Добавили dark: классы для input
        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 text-gray-800
                   dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
      />
    </div>
  );
};

export default InputField;
