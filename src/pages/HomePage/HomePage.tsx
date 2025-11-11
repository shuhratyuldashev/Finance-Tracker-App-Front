import Header from '../../components/Dashboard/Header';
import Charts from '../../components/Dashboard/Charts';
import SortButtons from '../../components/Dashboard/SortButtons';
import TransactionsList from '../../components/Dashboard/TransactionsList';
import Sidebar from '../../components/Dashboard/Sidebar';
import SearchAndActions from '../../components/Dashboard/SearchAndActions';

interface FinanceTrackerPageProps {
  page: 'dashboard' | 'incomes' | 'expenses';
}


interface Transaction {
  id: number;
  date: string;
  amount: string;
  category: string;
  type: 'income' | 'expense';
}

const FinanceTrackerPage = ({ page }: FinanceTrackerPageProps) => {
  // УДАЛЕНО: const [darkMode, setDarkMode] = useState(false);

  const transactions: Transaction[] = [
    { id: 1, date: '01.11.2025', amount: '+100$', category: 'Category 1', type: 'income' },
    { id: 2, date: '01.11.2025', amount: '-100$', category: 'Category 1', type: 'expense' },
    { id: 3, date: '01.11.2025', amount: '-100$', category: 'Category 1', type: 'expense' },
    { id: 4, date: '01.11.2025', amount: '+100$', category: 'Category 1', type: 'income' },
    { id: 5, date: '01.11.2025', amount: '-100$', category: 'Category 1', type: 'expense' },
    { id: 6, date: '01.11.2025', amount: '+100$', category: 'Category 1', type: 'income' },
  ];

 return (
    <div className='flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <Sidebar />
      
      <div className="flex-1 overflow-auto p-4 lg:p-8">
        <Header page={page}/>
        <Charts />
        {/* SearchAndActions и SortButtons будут использовать переводы */}
        <SearchAndActions />
        <div className="hidden md:block">
            <SortButtons />
        </div>
        <TransactionsList transactions={transactions} />
      </div>
    </div>
  );
};

export default FinanceTrackerPage;