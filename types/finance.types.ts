import { ReactNode } from "react";

export type ExpenseItem = {
  id: string;
  createdAt: Date;
  amount: number;
};

export type ExpenseCategory = {
  id: string;
  uid: string;
  title: string;
  items: ExpenseItem[];
  total: number;
};

export type IncomeItem = {
  id: string;
  createdAt: Date;
  amount: number;
  description: string;
};

export type FinanceContextType = {
  income: IncomeItem[];
  expenses: ExpenseCategory[];
  addIncomeItem: (newIncome: IncomeItem) => Promise<void>;
  removeIncomeItem: (incomeId: string) => Promise<void>;
  addExpenseItem: (
    expenseCategoryId: string,
    newExpense: ExpenseCategory
  ) => Promise<void>;
  addCategory: (category: ExpenseCategory) => Promise<void>;
  deleteExpenseItem: (
    updatedExpense: ExpenseCategory,
    expenseCategoryId: string
  ) => Promise<void>;
  deleteExpenseCategory: (expenseCategoryId: string) => Promise<void>;
};

export type FinanceContextProviderProps = {
  children: ReactNode;
};
