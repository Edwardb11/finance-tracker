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
  color: string;
  items: ExpenseItem[];
  total: number;
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

export type IncomeItem = {
  id: string;
  amount: number;
  description: string;
  createdAt: Date;
  uid?: string;
};

export type Expense = {
  id: string;
  title: string;
  items: {
    id: string;
    createdAt: Date;
    amount: number;
  }[];
  total: number;
};