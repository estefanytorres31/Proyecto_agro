/* eslint-disable react/prop-types */
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import useCosecha from '../hooks/Cosecha/useCosecha';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductionBarChart = ({ tamañoFruto, codigoFundo }) => {
  const { rankingData, loading, error } = useCosecha();
  console.log('Datos recibidos en SectorBarChart', tamañoFruto, codigoFundo);

  const safeRankingData = Array.isArray(rankingData) ? rankingData : [];

  const validTamañoFruto = tamañoFruto ? tamañoFruto.charAt(0).toUpperCase() + tamañoFruto.slice(1) : "Desconocido";
  
  console.log("Datos de ranking:", safeRankingData); // Ver los datos de ranking recibidos
  console.log("Tamaño de Fruto:", validTamañoFruto); // Ver el valor de tamañoFruto

  const data = {
    labels: safeRankingData.map(item => item.nombre_planta), 
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

  console.log("Datos para el gráfico:", data);  // Ver los datos listos para el gráfico

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Ranking de Plantas por Frutos ${validTamañoFruto}`
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