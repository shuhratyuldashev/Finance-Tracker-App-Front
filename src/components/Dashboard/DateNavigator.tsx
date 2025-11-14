import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateNavigatorProps {
  defaultDate?: Date;
  onDateChange?: (date: Date) => void;
  locale?: string;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  defaultDate = new Date(),
  onDateChange,
  locale = "ru-RU",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const formatMonth = (date: Date): string => {
    const monthNames = {
      "ru-RU": [
        "Янв.",
        "Фев.",
        "Март",
        "Апр.",
        "Май",
        "Июнь",
        "Июль",
        "Авг.",
        "Сент.",
        "Окт.",
        "Нояб.",
        "Дек.",
      ],
      "en-US": [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "June",
        "July",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec.",
      ],
    };

    const names =
      monthNames[locale as keyof typeof monthNames] || monthNames["en-US"];
    return `${names[date.getMonth()]} ${date.getFullYear()}`;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setIsTransitioning(true);

    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    setSelectedDate(newDate);
    onDateChange?.(newDate);

    setTimeout(() => setIsTransitioning(false), 150);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => navigateMonth("prev")}
        className="text-gray-400 hover:text-white dark:hover:text-white duration-200 p-1 hover:bg-blue-500 rounded-full transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <h1
        className={`text-xl font-semibold text-gray-900 dark:text-gray-100 min-w-[140px] text-center transition-opacity duration-150 ${
          isTransitioning ? "opacity-50" : "opacity-100"
        }`}
      >
        {formatMonth(selectedDate)}
      </h1>

      <button
        onClick={() => navigateMonth("next")}
        className="text-gray-400 hover:text-white dark:hover:text-white duration-200 p-1 hover:bg-blue-500 rounded-full transition-colors"
        aria-label="Next month"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DateNavigator;
