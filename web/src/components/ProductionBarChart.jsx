/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import useCosecha from '../hooks/Cosecha/useCosecha';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductionBarChart = ({ tamañoFruto, codigoFundo }) => {
  const { rankingData, fetchRankingData } = useCosecha();
  const [isDataLoaded, setIsDataLoaded] = useState(false);  

  // Ejecutar la función para obtener los datos cuando cambian `tamañoFruto` o `codigoFundo`
  useEffect(() => {
    fetchRankingData(tamañoFruto, codigoFundo);
  }, [tamañoFruto, codigoFundo, fetchRankingData]);

  // Verificar si los datos de ranking están cargados
  useEffect(() => {
    if (rankingData.plantas.length > 0) {
      console.log('Ranking Data:', rankingData);
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
    }
  }, [rankingData]);

  // Mapear las columnas de tamaño de frutos
  const columnMapping = {
    Grande: 'frutas_grandes',
    Mediano: 'frutas_medianas',
    Pequeño: 'frutas_pequeñas',
    'No hay fruto': 'frutas_sin_fruto'
  };

  const columnName = columnMapping[tamañoFruto];

  // Filtrar los datos de ranking
  const safeRankingData = Array.isArray(rankingData.plantas)
    ? rankingData.plantas.filter(item => item[columnName] > 0)
    : [];

  // Preparar los datos para el gráfico
  const data = {
    labels: safeRankingData.map(item => `${item.codigo_planta}`),
    datasets: [
      {
        label: `Plantas con frutos ${tamañoFruto}`,
        data: safeRankingData.map(item => item[columnName]),
        backgroundColor: '#3B82F6',
        borderColor: '#1E40AF',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Ranking de Plantas - ${tamañoFruto}`
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Cantidad de frutos ${tamañoFruto}`
        }
      },
      y: {
        ticks: { autoSkip: false }
      }
    }
  };

  // Verificar si los datos están cargando
  if (rankingData.isLoading) {
    return <div>Cargando datos...</div>;
  }

  // Si los datos están vacíos
  if (!isDataLoaded || safeRankingData.length === 0) {
    return <div>No hay datos disponibles para {tamañoFruto}</div>;
  }

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductionBarChart;
