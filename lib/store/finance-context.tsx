"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "./auth-context";
import {
  ExpenseCategory,
  FinanceContextType,
  IncomeItem,
} from "@/types/finance.types";

const financeContext = createContext<FinanceContextType>({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});

type FinanceContextProviderProps = {
  children: ReactNode;
};

export default function FinanceContextProvider({
  children,
}: FinanceContextProviderProps) {
  const [income, setIncome] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseCategory[]>([]);

  const { user } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      if (!user) return;

      const incomeCollectionRef = collection(db, "income");
      const incomeQuery = query(
        incomeCollectionRef,
        where("uid", "==", user.uid)
      );

      const incomeDocsSnap = await getDocs(incomeQuery);

      const incomeData = incomeDocsSnap.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        description: doc.data().description,
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));

      setIncome(incomeData);

      const expensesCollectionRef = collection(db, "expenses");
      const expensesQuery = query(
        expensesCollectionRef,
        where("uid", "==", user.uid)
      );

      const expensesDocsSnap = await getDocs(expensesQuery);

      const expensesData = expensesDocsSnap.docs.map((doc) => ({
        id: doc.id,
        uid: doc.data().uid,
        title: doc.data().title,
        items: doc.data().items,
        total: doc.data().total,
        color: doc.data().color,
      }));

      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addCategory = async (category: ExpenseCategory) => {
    try {
      const collectionRef = collection(db, "expenses");

      const docSnap = await addDoc(collectionRef, {
        ...(user && { uid: user.uid }),
        ...category,
      });

      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { ...(user && { uid: user.uid }), ...category, items: [] },
      ]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const addExpenseItem = async (
    expenseCategoryId: string,
    newExpense: ExpenseCategory
  ) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      const { id, ...expenseWithoutId } = newExpense;
      await updateDoc(docRef, { ...expenseWithoutId });

      setExpenses((prevState) =>
        prevState.map((expense) =>
          expense.id === expenseCategoryId ? newExpense : expense
        )
      );
    } catch (error) {
      console.error("Error adding expense item:", error);
    }
  };

  const deleteExpenseItem = async (
    updatedExpense: ExpenseCategory,
    expenseCategoryId: string
  ) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, { ...updatedExpense });

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseCategoryId ? updatedExpense : expense
        )
      );
    } catch (error) {
      console.error("Error deleting expense item:", error);
    }
  };

  const deleteExpenseCategory = async (expenseCategoryId: string) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseCategoryId)
      );
    } catch (error) {
      console.error("Error deleting expense category:", error);
    }
  };

  const addIncomeItem = async (newIncome: IncomeItem) => {
    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);
      const { id, ...incomeWithoutId } = newIncome;

      setIncome((prevState) => [
        ...prevState,
        { id: docSnap.id, ...incomeWithoutId },
      ]);
    } catch (error) {
      console.error("Error adding income item:", error);
    }
  };

  const removeIncomeItem = async (incomeId: string) => {
    const docRef = doc(db, "income", incomeId);

    try {
      await deleteDoc(docRef);

      setIncome((prevState) => prevState.filter((i) => i.id !== incomeId));
    } catch (error) {
      console.error("Error removing income item:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, user]);

  const contextValues: FinanceContextType = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };

  return (
    <financeContext.Provider value={contextValues}>
      {children}
    </financeContext.Provider>
  );
}

export const useFinance = () => {
  return useContext(financeContext);
};
