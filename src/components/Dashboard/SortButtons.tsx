import React from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  Calendar,
  DollarSign,
  Tag,
} from "lucide-react";
import { useTransactionsFilter } from "../lib/useTransactionsFilter";

const categories = [
  "All",
  "Salary",
  "Food",
  "Shopping",
  "Freelance",
  "Transport",
  "Investment",
];

export const SortFilterPanel = ({ filter }: { filter: ReturnType<typeof useTransactionsFilter> }) => {
  const {
    sortBy,
    sortOrder,
    showFilters,
    setShowFilters,
    setSelectedCategory,
    selectedCategory,
    setTypeFilter,
    typeFilter,
    handleSort,
    activeFiltersCount,
  } = filter;

  const getSortIcon = (field: string) => {
    if (sortBy !== field) return <ArrowUpDown size={14} className="opacity-50" />;
    return sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 mb-6 mt-6">
      {/* Sort Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm hidden md:block font-medium text-gray-600 dark:text-gray-400 mr-2">
          Sort by:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSort("date")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === "date"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Calendar size={16} /> Date {getSortIcon("date")}
          </button>

          <button
            onClick={() => handleSort("amount")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === "amount"
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <DollarSign size={16} /> Amount {getSortIcon("amount")}
          </button>

          <button
            onClick={() => handleSort("category")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              sortBy === "category"
                ? "bg-purple-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Tag size={16} /> Category {getSortIcon("category")}
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter size={16} /> Filters
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={() => {
              setSelectedCategory("All");
              setTypeFilter("all");
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <X size={14} /> Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
          {/* Type Filter */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Transaction Type
            </label>
            <div className="flex gap-2">
              {["all", "income", "expense"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    typeFilter === type
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-purple-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
