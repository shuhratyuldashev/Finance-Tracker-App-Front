import { useState } from "react";
import Modal from "../Modal";
import InputField from "../InputField";
import { Calendar, DollarSign, Hash, Tag, TrendingDown, TrendingUp } from "lucide-react";

const categories = [
  { id: 1, name: "Еда" },
  { id: 2, name: "Транспорт" },
  { id: 3, name: "Зарплата" },
  { id: 4, name: "Развлечения" },
];

export const useTransactionModals = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [modalType, setModalType] = useState<"create" | "edit" | "delete" | "view" | "category" | null>(null);

  const openModal = (type: typeof modalType, transaction?: any) => {
    setModalType(type);
    setSelectedTransaction(transaction || null);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedTransaction(null);
  };

  const CreateModal = () => {
    const [type, setType] = useState<"income" | "expense">("income");
    const [category, setCategory] = useState(categories[0].id);
    const [amount, setAmount] = useState("");

    const handleCreate = async () => {
      console.log("Создать транзакцию:", { type, category, amount });
      closeModal();
    };

    return (
      <Modal
        open={modalType === "create"}
        onClose={closeModal}
        title="Создать транзакцию"
        footer={
          <div className="flex justify-end space-x-2">
            <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800">
              Отмена
            </button>
            <button onClick={handleCreate} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Сохранить
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Тип</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full mt-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2"
            >
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Категория</label>
            <select
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
              className="w-full mt-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            id="amount"
            label="Сумма"
            type="number"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </Modal>
    );
  };

  const EditModal = () => {
    const [amount, setAmount] = useState("");

    const handleEdit = async () => {
      console.log("Создать транзакцию:", { amount });
      closeModal();
    };


    return(
    <Modal
      open={modalType === "edit"}
      onClose={closeModal}
      title="Редактировать транзакцию"
      footer={
        <div className="flex justify-end space-x-2">
            <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800">
              Отмена
            </button>
            <button onClick={handleEdit} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Сохранить
            </button>
          </div>
      }
    >
       <div className="space-y-4">
          <InputField
            id="amount"
            label="Сумма"
            type="number"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
    </Modal>
  )}

  const DeleteModal = () => (
    <Modal
      open={modalType === "delete"}
      onClose={closeModal}
      title="Удалить транзакцию"
      footer={
        <div className="flex justify-end space-x-2">
          <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800">
            Отмена
          </button>
          <button
            onClick={() => {
              console.log("Удалена транзакция", selectedTransaction?.id);
              closeModal();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            Удалить
          </button>
        </div>
      }
    >
      <p>Вы уверены, что хотите удалить транзакцию #{selectedTransaction?.id}?</p>
    </Modal>
  );

  const ViewModal = () => (
    <Modal open={modalType === "view"} onClose={closeModal} title="Информация о транзакции">
      <div className="space-y-4">
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
      <Hash className="w-5 h-5 text-blue-600" />
    </div>
    <div>
      <p className="text-xs text-gray-500">ID транзакции</p>
      <p className="font-semibold text-gray-900">{selectedTransaction?.id}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
      <Calendar className="w-5 h-5 text-purple-600" />
    </div>
    <div>
      <p className="text-xs text-gray-500">Дата</p>
      <p className="font-semibold text-gray-900">{selectedTransaction?.date}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
      <DollarSign className="w-5 h-5 text-green-600" />
    </div>
    <div>
      <p className="text-xs text-gray-500">Сумма</p>
      <p className="font-semibold text-gray-900">{selectedTransaction?.amount}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
      <Tag className="w-5 h-5 text-orange-600" />
    </div>
    <div>
      <p className="text-xs text-gray-500">Категория</p>
      <p className="font-semibold text-gray-900">{selectedTransaction?.category}</p>
    </div>
  </div>

  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
      selectedTransaction?.type === "income" ? "bg-emerald-100" : "bg-red-100"
    }`}>
      {selectedTransaction?.type === "income" ? (
        <TrendingUp className="w-5 h-5 text-emerald-600" />
      ) : (
        <TrendingDown className="w-5 h-5 text-red-600" />
      )}
    </div>
    <div>
      <p className="text-xs text-gray-500">Тип</p>
      <p className={`font-semibold ${
        selectedTransaction?.type === "income" ? "text-emerald-600" : "text-red-600"
      }`}>
        {selectedTransaction?.type === "income" ? "Доход" : "Расход"}
      </p>
    </div>
  </div>
</div>
    </Modal>
  );
 const CategoryModal = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const handleAddCategory = async () => {
      console.log("Добавлена категория:", { name, code });
      closeModal();
    };

    return (
      <Modal
        open={modalType === "category"}
        onClose={closeModal}
        title="Добавить категорию"
        footer={
          <div className="flex justify-end space-x-2">
            <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800">
              Отмена
            </button>
            <button onClick={handleAddCategory} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              Добавить
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <InputField
            id="name"
            label="Название категории"
            placeholder="Например: Еда"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField
            id="code"
            label="Код категории"
            placeholder="Например: eda_transport"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
      </Modal>
    );
  };

  return {
    modalType,
    selectedTransaction,
    openModal,
    closeModal,
    CreateModal,
    EditModal,
    DeleteModal,
    ViewModal,
    CategoryModal,
  };
};
