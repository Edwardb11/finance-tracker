import { currencyFormatter } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { useFinance } from "@/lib/store/finance-context";
import { ExpenseCategory } from "@/types/finance.types";
import { useAuth } from "@/lib/store/auth-context";

type Expense = {
  id: string;
  title: string;
  items: {
    id: string;
    createdAt: Date;
    amount: number;
  }[];
  total: number;
};

type ViewExpenseModalProps = {
  show: boolean;
  onClose: (show: boolean) => void;
  expense: Expense;
};

const ViewExpenseModal: React.FC<ViewExpenseModalProps> = ({
  show,
  onClose,
  expense,
}) => {
  const { deleteExpenseItem, deleteExpenseCategory } = useFinance();

  const { user } = useAuth();
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
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button onClick={deleteExpenseHandler} className="btn btn-danger">
          Delete
        </button>
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
