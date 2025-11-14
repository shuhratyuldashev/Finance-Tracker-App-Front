import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Filler,
  Legend
);

const LineChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Income",
              data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
              borderColor: "#4f46e5",
              backgroundColor: "rgba(79,70,229,0.2)",
              fill: true,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: "#4f46e5",
              tension: 0.4,
            },
            {
              label: "Expense",
              data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
              borderColor: "#ef4444",
              backgroundColor: "rgba(239,68,68,0.2)",
              fill: true,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: "#ef4444",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "#9ca3af", font: { size: 12 } },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderWidth: 0,
              cornerRadius: 8,
            },
          },
          scales: {
            x: {
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(156,163,175,0.2)" },
            },
            y: {
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(156,163,175,0.2)" },
            },
          },
          animation: {
            duration: 1200,
            easing: "easeOutQuart",
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-5">
      <h2 className="text-lg font-semibold mb-3 dark:text-gray-100">
        Monthly Overview
      </h2>
      <div className="h-[320px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default LineChartComponent;
