"use client"
import {
    createContext,
    useState,
    useEffect,
    ReactNode,
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
import { ExpenseCategory, FinanceContextType, IncomeItem } from "@/types/finance.types";

export const financeContext = createContext<FinanceContextType>({
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
      throw error;
    }
  };

  const addExpenseItem = async (
    expenseCategoryId: string,
    newExpense: ExpenseCategory
  ) => {
    const docRef = doc(db, "expenses", expenseCategoryId);

    try {
      await updateDoc(docRef, { ...newExpense, id: undefined });

      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];
        const foundIndex = updatedExpenses.findIndex(
          (expense) => expense.id === expenseCategoryId
        );
        updatedExpenses[foundIndex] = { ...newExpense };
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseItem = async (
    updatedExpense: ExpenseCategory,
    expenseCategoryId: string
  ) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, { ...updatedExpense });

      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const pos = updatedExpenses.findIndex(
          (ex) => ex.id === expenseCategoryId
        );
        updatedExpenses[pos].items = [...updatedExpense.items];
        updatedExpenses[pos].total = updatedExpense.total;
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
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
      throw error;
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
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  const removeIncomeItem = async (incomeId: string) => {
    const docRef = doc(db, "income", incomeId);

    try {
      await deleteDoc(docRef);

      setIncome((prevState) => prevState.filter((i) => i.id !== incomeId));
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (!user) return;

    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const q = query(collectionRef, where("uid", "==", user.uid));

      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => ({
        id: doc.id,
        amount: doc.data().amount,
        description: doc.data().description,
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));

      setIncome(data);
    };

    const getExpensesData = async () => {
      const collectionRef = collection(db, "expenses");
      const q = query(collectionRef, where("uid", "==", user.uid));

      const docsSnap = await getDocs(q);

      const data = docsSnap.docs.map((doc) => ({
        id: doc.id,
        uid: doc.data().uid,
        title: doc.data().title,
        items: doc.data().items,
        total: doc.data().total,
      }));

      setExpenses(data);
    };

    getIncomeData();
    getExpensesData();
  }, [user]);

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
