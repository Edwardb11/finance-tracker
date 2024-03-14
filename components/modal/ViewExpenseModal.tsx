import { currencyFormatter } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useFinance } from "@/lib/store/finance-context";
import { ExpenseCategory } from "@/types/finance.types";
import { useAuth } from "@/lib/store/auth-context";
import { useState } from "react";

type ViewExpenseModalProps = {
  show: boolean;
  onClose: (show: boolean) => void;
  expense: ExpenseCategory;
};

const ViewExpenseModal: React.FC<ViewExpenseModalProps> = ({
  show,
  onClose,
  expense,
}) => {
  const { deleteExpenseItem, deleteExpenseCategory, editExpenseCategory } =
    useFinance();

  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(expense.title);
  const [editedColor, setEditedColor] = useState(expense.color);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const updatedCategory: ExpenseCategory = {
      ...expense,
      title: editedTitle,
      color: editedColor,
    };
    editExpenseCategory(updatedCategory);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(expense.title);
    setEditedColor(expense.color);
    setEditing(false);
  };
  const deleteExpenseHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id);
      toast.success("Expense category deleted successfully!");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteExpenseItemHandler = async (item: {
    id: string;
    createdAt: Date;
    amount: number;
  }) => {
    try {
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      const updatedExpense: ExpenseCategory = {
        id: expense.id,
        uid: user?.uid || "",
        title: "",
        color: "",
        items: [...updatedItems],
        total: expense.total - item.amount,
      };

      await deleteExpenseItem(updatedExpense, expense.id);
      toast.success("Expense item removed successfully!");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={() => onClose(false)}>
      <div>
        {editing ? (
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1"
            />
            <input
              type="color"
              value={editedColor}
              onChange={(e) => setEditedColor(e.target.value)}
              className="ml-4 h-8 w-8 rounded-full border border-gray-300"
            />
            <div>
              <button onClick={handleSave} className="btn btn-primary mr-2">
                Save
              </button>
              <button onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h2 className="text-4xl">{expense.title}</h2>
            <div>
              <button
                onClick={handleEditClick}
                className="btn btn-primary mr-2">
                Edit
              </button>
              <button onClick={deleteExpenseHandler} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3 className="my-4 text-2xl">Expense History</h3>
        {expense.items?.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <small>
                {item.createdAt instanceof Date
                  ? item.createdAt.toISOString()
                  : ""}
              </small>{" "}
              <p className="flex items-center gap-2">
                {currencyFormatter(item.amount)}
                <button
                  onClick={() => {
                    deleteExpenseItemHandler(item);
                  }}>
                  <FaRegTrashAlt />
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ViewExpenseModal;
