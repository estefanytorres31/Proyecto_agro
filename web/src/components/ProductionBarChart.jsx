/* eslint-disable react/prop-types */
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

const RankingChart = ({ data, tamañoFruto }) => {
  const frutoKey = tamañoFruto === 'No hay fruto' ? 'frutas_no_hay_frutos' : `frutas_${tamañoFruto.toLowerCase()}s`;

  const chartData = {
    labels: data.map(item => item.codigo_planta),
    datasets: [
      {
        label: `Cantidad de frutas ${tamañoFruto.toLowerCase()}`,
        data: data.map(item => item[frutoKey]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
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
        text: `Ranking de plantas por cantidad de frutas ${tamañoFruto.toLowerCase()}`,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default RankingChart;

