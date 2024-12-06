import  { useEffect, useRef } from "react";
import { Chart as ChartJS, BarElement, BarController, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard = () => {
  const chartARef = useRef(null);
  const chartBRef = useRef(null);

  const createBarChart = (ref, label, data) => {
    const ctx = ref.getContext('2d');
    const existingChart = ChartJS.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Grande", "Mediano", "Pequeño", "No hay"],
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: ["#52d32c", "#ff8001", "#f40606", "#c4c4c4"],
            borderColor: ["#3fda12", "#ff8001", "#e30808", "#c1baba"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  useEffect(() => {
    if (chartARef.current && chartBRef.current) {
      createBarChart(chartARef.current, "Sector A", [50, 20, 30, 0]);
      createBarChart(chartBRef.current, "Sector B", [20, 50, 30, 0]);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-lg font-semibold">SCORPIUS 1</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative w-full h-64">
          <canvas ref={chartARef}></canvas>
        </div>
        <div className="relative w-full h-64">
          <canvas ref={chartBRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

