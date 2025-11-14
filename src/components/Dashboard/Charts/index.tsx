import { useState, useMemo } from 'react'; // FIX 1: Removed unused 'React' default import
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// --- ДАННЫЕ (без изменений) ---
const monthlyData = [
  { day: 1, income: 300, expense: 200 },
  { day: 2, income: 250, expense: 180 },
  { day: 3, income: 400, expense: 220 },
  { day: 4, income: 350, expense: 250 },
  { day: 5, income: 500, expense: 300 },
  { day: 6, income: 420, expense: 280 },
  { day: 7, income: 480, expense: 310 },
  { day: 8, income: 510, expense: 320 },
  { day: 9, income: 470, expense: 290 },
  { day: 10, income: 530, expense: 350 },
  { day: 11, income: 600, expense: 370 },
  { day: 12, income: 560, expense: 340 },
  { day: 13, income: 540, expense: 330 },
  { day: 14, income: 580, expense: 360 },
  { day: 15, income: 610, expense: 380 },
  { day: 16, income: 650, expense: 400 },
  { day: 17, income: 620, expense: 390 },
  { day: 18, income: 630, expense: 410 },
  { day: 19, income: 640, expense: 400 },
  { day: 20, income: 600, expense: 380 },
  { day: 21, income: 620, expense: 390 },
  { day: 22, income: 660, expense: 420 },
  { day: 23, income: 650, expense: 410 },
  { day: 24, income: 630, expense: 400 },
  { day: 25, income: 700, expense: 450 },
  { day: 26, income: 680, expense: 440 },
  { day: 27, income: 690, expense: 430 },
  { day: 28, income: 670, expense: 420 },
  { day: 29, income: 710, expense: 460 },
  { day: 30, income: 730, expense: 470 },
];

const monthlyIncomesData = [
  { day: 1, income: 300 },
  { day: 2, income: 250 },
  { day: 3, income: 400 },
  { day: 4, income: 350 },
  { day: 5, income: 500 },
  { day: 6, income: 420 },
  { day: 7, income: 480 },
  { day: 8, income: 510 },
  { day: 9, income: 470 },
  { day: 10, income: 530 },
  { day: 11, income: 600 },
  { day: 12, income: 560 },
  { day: 13, income: 540 },
  { day: 14, income: 580 },
  { day: 15, income: 610 },
  { day: 16, income: 650 },
  { day: 17, income: 620 },
  { day: 18, income: 630 },
  { day: 19, income: 640 },
  { day: 20, income: 600 },
  { day: 21, income: 620 },
  { day: 22, income: 660 },
  { day: 23, income: 650 },
  { day: 24, income: 630 },
  { day: 25, income: 700 },
  { day: 26, income: 680 },
  { day: 27, income: 690 },
  { day: 28, income: 670 },
  { day: 29, income: 710 },
  { day: 30, income: 730 },
];

const monthlyExpensesData = [
  { day: 1, expense: 200 },
  { day: 2, expense: 180 },
  { day: 3, expense: 220 },
  { day: 4, expense: 250 },
  { day: 5, expense: 300 },
  { day: 6, expense: 280 },
  { day: 7, expense: 310 },
  { day: 8, expense: 320 },
  { day: 9, expense: 290 },
  { day: 10, expense: 350 },
  { day: 11, expense: 370 },
  { day: 12, expense: 340 },
  { day: 13, expense: 330 },
  { day: 14, expense: 360 },
  { day: 15, expense: 380 },
  { day: 16, expense: 400 },
  { day: 17, expense: 390 },
  { day: 18, expense: 410 },
  { day: 19, expense: 400 },
  { day: 20, expense: 380 },
  { day: 21, expense: 390 },
  { day: 22, expense: 420 },
  { day: 23, expense: 410 },
  { day: 24, expense: 400 },
  { day: 25, expense: 450 },
  { day: 26, expense: 440 },
  { day: 27, expense: 430 },
  { day: 28, expense: 420 },
  { day: 29, expense: 460 },
  { day: 30, expense: 470 },
];

const pieChartData = [
  { name: 'Food & Dining', value: 850, color: '#3b82f6', icon: '🍔' },
  { name: 'Shopping', value: 520, color: '#0ea5e9', icon: '🛍️' },
  { name: 'Transport', value: 425, color: '#06b6d4', icon: '🚗' },
  { name: 'Entertainment', value: 675, color: '#8b5cf6', icon: '🎮' },
  { name: 'Bills & Utilities', value: 950, color: '#ec4899', icon: '💡' },
];

// --- ТУЛТИПЫ И КАСТОМНЫЕ ЭЛЕМЕНТЫ ---

// FIX 2: Added types for 'active' and 'payload'
const CustomLineTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const hasIncome = data.income !== undefined;
    const hasExpense = data.expense !== undefined;

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[200px]">
        <p className="font-bold text-gray-800 dark:text-white mb-3 text-base">
          Day {data.day}
        </p>
        {/* FIX 3: Added types for 'entry' and 'index' */}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {entry.dataKey}
              </span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-white ml-4">
              ${entry.value}
            </span>
          </div>
        ))}

        {hasIncome && hasExpense && (
          <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Net
              </span>
              <span
                className={`font-bold text-sm ${
                  data.income - data.expense >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {data.income - data.expense >= 0 ? '+' : ''}$
                {data.income - data.expense}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// FIX 4: Added type for 'props'
const CustomDot = (props: any) => {
  const { cx, cy, stroke } = props;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill={stroke}
        opacity={0.2}
        className="animate-pulse"
      />
      <circle cx={cx} cy={cy} r={5} fill={stroke} opacity={0.4} />
      <circle
        cx={cx}
        cy={cy}
        r={3}
        fill={stroke}
        stroke="white"
        strokeWidth={2}
      />
    </g>
  );
};

// --- ОСНОВНОЙ КОМПОНENT ---
const ModernCharts = ({
  type,
}: {
  type: 'dashboard' | 'incomes' | 'expenses';
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // FIX 5: Added 'percentage' to the state type
  const [centerLabel, setCenterLabel] = useState<{ name: string; value: string; percentage?: string }>({
    name: 'Total Spending',
    value: '3,420',
  });

  const chartConfig = useMemo(() => {
    switch (type) {
      case 'incomes':
        return {
          areaData: monthlyIncomesData,
          title: 'Income Overview',
          subTitle: 'Monthly income trend',
          showIncomeArea: true,
          showExpenseArea: false,
          showPieChart: true,
          areaChartSpan: 'lg:col-span-2',
        };
      case 'expenses':
        return {
          areaData: monthlyExpensesData,
          title: 'Expense Overview',
          subTitle: 'Monthly expense trend',
          showIncomeArea: false,
          showExpenseArea: true,
          showPieChart: true,
          areaChartSpan: 'lg:col-span-2',
        };
      case 'dashboard':
      default:
        return {
          areaData: monthlyData,
          title: 'Income vs Expenses',
          subTitle: 'Monthly financial overview with trends',
          showIncomeArea: true,
          showExpenseArea: true,
          showPieChart: true,
          areaChartSpan: 'lg:col-span-2',
        };
    }
  }, [type]);

  // FIX 6: Added types for '_' and 'index'
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    const item = pieChartData[index];
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((item.value / total) * 100).toFixed(1);
    setCenterLabel({
      name: item.name,
      value: `$${item.value}`,
      percentage: `${percentage}%`, // This line is now valid
    });
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);
    setCenterLabel({ name: 'Total Spending', value: `$${total.toLocaleString()}` });
  };

  return (
    <div className="from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl ${chartConfig.areaChartSpan}`}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {chartConfig.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chartConfig.subTitle}
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[900px] h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartConfig.areaData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="incomeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient
                        id="expenseGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="day"
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `$${value}`}
                    />

                    <Tooltip
                      content={<CustomLineTooltip />}
                      cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                    />

                    {chartConfig.showIncomeArea && (
                      <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="url(#incomeGradient)"
                        dot={<CustomDot />}
                        activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    )}
                    {chartConfig.showExpenseArea && (
                      <Area
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        strokeWidth={3}
                        fill="url(#expenseGradient)"
                        dot={<CustomDot />}
                        activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                        animationBegin={200}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
              {chartConfig.showIncomeArea && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Income
                  </span>
                </div>
              )}
              {chartConfig.showExpenseArea && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Expenses
                  </span>
                </div>
              )}
            </div>
          </div>

          {chartConfig.showPieChart && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  Spending by Category
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Where your money goes
                </p>
              </div>

              <div className="relative h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={4}
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      animationBegin={0}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={entry.color}
                          strokeWidth={activeIndex === index ? 4 : 0}
                          style={{
                            filter:
                              activeIndex === index
                                ? 'brightness(1.1) drop-shadow(0 0 8px currentColor)'
                                : 'none',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      {centerLabel.name}
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {centerLabel.value}
                    </p>
                    {/* This conditional logic is now valid */}
                    {centerLabel.percentage && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        {centerLabel.percentage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernCharts;