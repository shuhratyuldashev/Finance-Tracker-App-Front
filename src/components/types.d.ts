// --- ИНТЕРФЕЙСЫ И ТИПЫ ---

export interface Transaction {
  id: number;
  date: string;
  amount: any;
  category: string;
  type: 'income' | 'expense';
}

// Тип для формы (без id, т.к. id присваивается при создании)
export type TransactionData = Omit<Transaction, 'id'>;

// Определяем, какой тип модального окна открыт
export type ModalType = 'create' | 'view' | 'edit' | 'delete' | null;


// --- СТАТИЧНЫЕ ДАННЫЫЕ ---

export const STATIC_CATEGORIES = {
  income: ['Зарплата', 'Фриланс', 'Инвестиции', 'Подарки'],
  expense: ['Продукты', 'Транспорт', 'Кафе и рестораны', 'Коммунальные', 'Развлечения', 'Здоровье'],
};

export const dummyTransactions: Transaction[] = [
  { id: 1, date: '2023-10-27', amount: 3500, category: 'Продукты', type: 'expense' },
  { id: 2, date: '2023-10-27', amount: 150000, category: 'Зарплата', type: 'income' },
  { id: 3, date: '2023-10-26', amount: 1200, category: 'Кафе и рестораны', type: 'expense' },
  { id: 4, date: '2023-10-25', amount: 500, category: 'Транспорт', type: 'expense' },
];