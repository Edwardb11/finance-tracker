"use client";
import { useState, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import { useFinance } from "@/lib/store/finance-context";
import { useAuth } from "@/lib/store/auth-context";
import SignIn from "@/components/SignIn/SignIn";
import AddIncomeModal from "@/components/modal/AddIncomeModal";
import AddExpensesModal from "@/components/modal/AddExpensesModal";
import ExpenseCategoryItem from "@/components/items/ExpenseCategoryItem";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  const { expenses, income } = useFinance();
  const { user } = useAuth();

  useEffect(() => {
    const newBalance: number =
      income.reduce((total: number, i) => total + i.amount, 0) -
      expenses.reduce((total: number, e) => total + e.total, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  const handleCloseIncome = () => {
    setShowAddIncomeModal(false);
  };

  const handleCloseExpense = () => {
    setShowAddExpenseModal(false);
  };

  return (
    <>
      <AddIncomeModal show={showAddIncomeModal} onClose={handleCloseIncome} />

      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={handleCloseExpense}
      />

      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setShowAddExpenseModal(true);
            }}
            className="btn btn-primary">
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowAddIncomeModal(true);
            }}
            className="btn btn-primary-outline">
            + Income
          </button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => (
              <ExpenseCategoryItem key={expense.id} expense={expense} />
            ))}
          </div>
        </section>

        <section className="py-6">
          <a id="stats" />
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
