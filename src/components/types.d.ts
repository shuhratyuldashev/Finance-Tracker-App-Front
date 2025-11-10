export interface Transaction {
  id: number;
  date: string;
  amount: string;
  type: 'income' | 'expense';
}
