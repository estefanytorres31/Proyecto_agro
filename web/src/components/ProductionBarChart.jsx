/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import useCosecha from '../hooks/Cosecha/useCosecha';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoRankingPlantas = ({ tamañoFruto, codigoFundo }) => {
  const { rankingData, loading, error } = useCosecha();

  const data = {
    labels: rankingData?.map(item => item.nombre_planta), 
    datasets: [
      {
        label: `Ranking de Plantas (${tamañoFruto})`,
        data: rankingData?.map(item => item[`frutas_${tamañoFruto.toLowerCase()}`]), 
        backgroundColor: rankingData?.map((_, index) => index % 2 === 0 ? "#FF6347" : "#32CD32"), 
        borderColor: "#FFFFFF",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Ranking de Plantas por Frutos ${tamañoFruto.charAt(0).toUpperCase() + tamañoFruto.slice(1)}`
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Ranking de Plantas por {tamañoFruto.charAt(0).toUpperCase() + tamañoFruto.slice(1)} - {codigoFundo}</h3>
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p>Error al cargar los datos: {error}</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default GraficoRankingPlantas;
