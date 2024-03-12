import { useRef, FormEvent } from "react";
import { currencyFormatter } from "@/lib/utils";
import { useFinance } from "@/lib/store/finance-context";
import { useAuth } from "@/lib/store/auth-context";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "./Modal";

type IncomeItem = {
  id: string;
  amount: number;
  description: string;
  createdAt: Date;
  uid: string;
};

type AddIncomeModalProps = {
  show: boolean;
  onClose: () => void;
};

const AddIncomeModal: React.FC<AddIncomeModalProps> = ({ show, onClose }) => {
  const amountRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const { income, addIncomeItem, removeIncomeItem } = useFinance();
  const { user } = useAuth();

  const addIncomeHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!amountRef.current || !descriptionRef.current) return;

    const newIncome: IncomeItem = {
      id: '',
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user?.uid || "",
    };

    try {
      await addIncomeItem(newIncome);
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (amountRef.current) amountRef.current.value = "";
      toast.success("Income added successfully!");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId: string) => {
    try {
      await removeIncomeItem(incomeId);
      toast.success("Income deleted successfully.");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
          <label htmlFor="amount">Income Amount</label>
          <input
            type="number"
            name="amount"
            ref={amountRef}
            min={0.01}
            step={0.01}
            placeholder="Enter income amount"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Enter income description"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add entry
        </button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>

        {income.map((i) => (
          <div className="flex justify-between item-center" key={i.id}>
            <div>
              <p className="font-semibold">{i.description}</p>
              <small className="text-xs">{i.createdAt.toISOString()}</small>
            </div>
            <p className="flex items-center gap-2">
              {currencyFormatter(i.amount)}
              <button onClick={() => deleteIncomeEntryHandler(i.id)}>
                <FaRegTrashAlt />
              </button>
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AddIncomeModal;
