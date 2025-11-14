import { useState, useMemo } from "react";
import type { Transaction } from "../types";

export const useTransactionsFilter = (transactions: Transaction[]) => {
  const [sortBy, setSortBy] = useState<"date" | "amount" | "category">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">(
    "all",
  );
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (field: "date" | "amount" | "category") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Filters
    if (selectedCategory !== "All")
      result = result.filter((t) => t.category === selectedCategory);
    if (typeFilter !== "all")
      result = result.filter((t) => t.type === typeFilter);

    // Sorting
    result.sort((a, b) => {
      let compareValue = 0;


      switch (sortBy) {
        case "date":
          compareValue =
            new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          compareValue = a.amount - b.amount;
          break;
        case "category":
          compareValue = a.category.localeCompare(b.category);
          break;
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return result;
  }, [transactions, sortBy, sortOrder, selectedCategory, typeFilter]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) + (typeFilter !== "all" ? 1 : 0);

  return {
    sortBy,
    sortOrder,
    selectedCategory,
    typeFilter,
    showFilters,
    setShowFilters,
    setSelectedCategory,
    setTypeFilter,
    handleSort,
    filteredAndSortedTransactions,
    activeFiltersCount,
  };
};
