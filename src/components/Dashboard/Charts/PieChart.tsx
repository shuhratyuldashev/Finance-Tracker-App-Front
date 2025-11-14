import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, Title);

const PieChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current?.getContext("2d");

    if (ctx) {
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Food", "Transport", "Shopping", "Entertainment", "Others"],
          datasets: [
            {
              label: "Categories",
              data: [35, 25, 20, 10, 10],
              backgroundColor: [
                "#6366f1",
                "#f59e0b",
                "#10b981",
                "#ef4444",
                "#3b82f6",
              ],
              borderColor: "#fff",
              borderWidth: 2,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "#9ca3af" },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              titleColor: "#fff",
              bodyColor: "#fff",
              borderWidth: 0,
              cornerRadius: 8,
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  const total = context.chart.data.datasets[0].data.reduce(
                    (sum: number, val: number) => sum + val,
                    0
                  );
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${percentage}%`;
                },
              },
            },
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1200,
            easing: "easeOutElastic",
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
        Category Breakdown
      </h2>
      <div className="h-[320px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default PieChartComponent;
