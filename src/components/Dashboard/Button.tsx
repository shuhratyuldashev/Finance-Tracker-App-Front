import React, { type ReactNode } from 'react';

// Простой компонент-заглушка для Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger';
  children: ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
  const baseStyle = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors";
  const styles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  
  // @ts-ignore (Простая заглушка, можно убрать)
  const variantStyle = styles[variant] || styles.default;

  return (
    <button ref={ref} className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
});

// Добавляем displayName для отладки
Button.displayName = 'Button';