/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import useCosecha from '../hooks/Cosecha/useCosecha';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductionBarChart = ({ tamañoFruto, codigoFundo }) => {
  const { rankingData, loading, error } = useCosecha();
  console.log('Datos recibidos en ProduccionChart', tamañoFruto, codigoFundo);

  const safeRankingData = Array.isArray(rankingData) ? rankingData : [];
  const validTamañoFruto = tamañoFruto ? tamañoFruto.charAt(0).toUpperCase() + tamañoFruto.slice(1) : "Desconocido";

  console.log("Datos de ranking:", safeRankingData); 
  console.log("Tamaño de Fruto:", validTamañoFruto); 

  const labels = safeRankingData.map(item => `${item.codigo_planta}`);

  const data = {
    labels: labels, 
    datasets: [
      {
        label: `Ranking de Plantas (${validTamañoFruto})`,
        data: safeRankingData.map(item => item[`frutas_${tamañoFruto.toLowerCase()}`]), 
        backgroundColor: safeRankingData.map((_, index) => index % 2 === 0 ? "#FF6347" : "#32CD32"), 
        borderColor: "#FFFFFF",
        borderWidth: 1
      }
    ]
  };

  console.log("Datos para el gráfico:", data); 

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false,  
          maxRotation: 45,  
          minRotation: 0,  
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h3>Ranking de Plantas por {validTamañoFruto} - {codigoFundo}</h3>
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

export default ProductionBarChart;
