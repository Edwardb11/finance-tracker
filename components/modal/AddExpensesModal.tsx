"use client"
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useFinance } from "@/lib/store/finance-context";
import { ExpenseCategory } from "@/types/finance.types";
import { useAuth } from "@/lib/store/auth-context";

type AddExpensesModalProps = {
  show: boolean;
  onClose: () => void;
};

const AddExpensesModal: React.FC<AddExpensesModalProps> = ({
  show,
  onClose,
}) => {
  const { user } = useAuth();
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );

  const { expenses, addExpenseItem, addCategory, editExpenseCategory } =
    useFinance();
  const titleRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const addExpenseItemHandler = async () => {
    if (!selectedCategory) return;

    const expense = expenses.find((e) => e.id === selectedCategory);

    if (!expense) return;

    const newExpense: ExpenseCategory = {
      ...expense,
      total: (expense.total || 0) + +expenseAmount,
      items: [
        ...(expense.items || []),
        {
          id: uuidv4(),
          amount: +expenseAmount,
          createdAt: new Date(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);

      setExpenseAmount("");
      setSelectedCategory(null);
      onClose();
      toast.success("Expense Item Added!");
    } catch (error) {
      console.log(error);
      toast.error("Error adding expense item");
    }
  };

  const addCategoryHandler = async () => {
    if (!titleRef.current || !colorRef.current) return;

    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      const newCategory: ExpenseCategory = {
        id: uuidv4(),
        uid: user?.uid || "",
        title,
        color,
        total: 0,
        items: [],
      };

      await addCategory(newCategory);
      setShowAddExpense(false);
      toast.success("Category created!");
    } catch (error) {
      console.log(error);
      toast.error("Error creating category");
    }
  };

  const editCategoryHandler = async () => {
    if (!editingCategoryId || !titleRef.current || !colorRef.current) return;

    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      const updatedCategory: ExpenseCategory = {
        id: editingCategoryId,
        uid: user?.uid || "",
        title,
        color,
        total: 0, 
        items: [], 
      };

      await editExpenseCategory(updatedCategory);
      setEditingCategoryId(null);
      toast.success("Category updated!");
    } catch (error) {
      console.log(error);
      toast.error("Error updating category");
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Enter an amount..</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {parseFloat(expenseAmount) > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter Title" ref={titleRef} />

              <label>Pick Color</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />
              <button
                onClick={addCategoryHandler}
                className="btn btn-primary-outline"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowAddExpense(false);
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          )}

          {expenses.map((expense) => (
            <button
              key={expense.id}
              onClick={() => {
                setSelectedCategory(expense.id);
              }}
            >
              <div
                style={{
                  boxShadow:
                    expense.id === selectedCategory ? "1px 1px 4px" : "none",
                }}
                className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-[25px] h-[25px] rounded-full"
                    style={{
                      backgroundColor: expense.color,
                    }}
                  />
                  <h4 className="capitalize">{expense.title}</h4>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCategoryId(expense.id);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </div>
            </button>
          ))}
        </div>
      )}

      {parseFloat(expenseAmount) > 0 && selectedCategory && (
        <div className="mt-6">
          <button
            className="btn btn-primary"
            onClick={addExpenseItemHandler}
          >
            Add Expense
          </button>
        </div>
      )}

      {editingCategoryId && (
        <div className="flex items-center justify-between mt-6">
          <input
            type="text"
            placeholder="Enter Title"
            defaultValue={
              expenses.find((expense) => expense.id === editingCategoryId)
                ?.title || ""
            }
            ref={titleRef}
          />

          <label>Pick Color</label>
          <input
            type="color"
            className="w-24 h-10"
            defaultValue={
              expenses.find((expense) => expense.id === editingCategoryId)
                ?.color || "#ffffff"
            }
            ref={colorRef}
          />
          <button
            onClick={editCategoryHandler}
            className="btn btn-primary-outline"
          >
            Save
          </button>
          <button
            onClick={() => setEditingCategoryId(null)}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AddExpensesModal;
