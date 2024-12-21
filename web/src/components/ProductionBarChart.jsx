import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const RankingChart = ({ data, tamañoFruto, titulo }) => {
  // Función helper para obtener la clave del fruto
  const getFrutoKey = (tamaño) => {
    return tamaño === 'No hay fruto' ? 'frutas_no_hay_frutos' : `frutas_${tamaño.toLowerCase()}s`;
  };

  // Configuración del gráfico
  const chartData = {
    labels: data.map(item => item.codigo_planta),
    datasets: [
      {
        label: `Cantidad de frutas ${tamañoFruto.toLowerCase()}`,
        data: data.map(item => item[getFrutoKey(tamañoFruto)]),
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        hoverBackgroundColor: ["rgba(244, 6, 6, 0.8)", "rgba(255, 128, 1, 0.8)", "rgba(82, 211, 44, 0.8)", "rgba(196, 196, 196, 0.8)"],
        borderColor: ["#a80505", "#b35b01", "#2e8b1c", "#8a8a8a"],
        borderWidth: 1,
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: titulo || `Ranking de plantas por cantidad de frutas ${tamañoFruto.toLowerCase()}`,
        color: '#333333',
        font: {
          size: 16,
          weight: 'bold',
          family: 'Arial, sans-serif',
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        cornerRadius: 8,
        padding: 10,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#e0e0e0',
          borderDash: [5, 5],
        },
        ticks: {
          color: '#666666',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333333',
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
  };

  return (
    <div 
      style={{ 
        height: '280px', 
        width: '100%', 
        padding: '10px', 
        backgroundColor: '#f9f9f9', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
      }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RankingChart;