import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Убрали darkMode из props
const Charts: React.FC = () => {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<Chart | null>(null);
  const doughnutChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // ... (логика графиков остается без изменений, 
    //      но можно добавить useTheme() и менять цвета графиков, если нужно)

    // Линейный график
    if (lineChartRef.current) {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      const ctx = lineChartRef.current.getContext('2d');
      if (!ctx) return;
      lineChartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', ''],
          datasets: [
            {
              data: [30, 45, 35, 50, 45, 35, 25],
              borderColor: '#3b82f6',
              backgroundColor: 'transparent',
              tension: 0.4,
              borderWidth: 3,
              pointRadius: 0,
            },
            // {
            //   data: [20, 25, 40, 30, 45, 55, 50],
            //   borderColor: '#ef4444',
            //   backgroundColor: 'transparent',
            //   tension: 0.4,
            //   borderWidth: 3,
            //   pointRadius: 0,
            // },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } },
        },
      });
    }

    // Круговой график
    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
      const ctx = doughnutChartRef.current.getContext('2d');
      if (!ctx) return;
      doughnutChartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [50, 20, 25, 75],
              backgroundColor: ['#3b82f6', '#0ea5e9', '#06b6d4', '#8b5cf6'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        },
      });
    }

    return () => {
      lineChartInstance.current?.destroy();
      doughnutChartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Линейный график: замена на dark: */}
      <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl">
        <div className="h-48">
          <canvas ref={lineChartRef}></canvas>
        </div>
      </div>
      {/* Круговой график: замена на dark: */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl flex items-center justify-center">
        <div className="h-40 w-40">
          <canvas ref={doughnutChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Charts;