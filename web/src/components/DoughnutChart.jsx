/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import useCosecha from '../hooks/Cosecha/useCosecha';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DoughnutChart = ({ codigoFundo }) => {
  const { cosechaData, fetchCosechaData } = useCosecha();

  useEffect(() => {
    fetchCosechaData(codigoFundo);
  }, [codigoFundo, fetchCosechaData]);

  if (cosechaData.isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (cosechaData.error) {
    return <p>Error: {cosechaData.error}</p>;
  }

  const frutos = cosechaData?.frutos || { pequeños: 0, medianos: 0, grandes: 0, sinFrutos: 0 };

  const doughnutData = {
    labels: ["Pequeños", "Medianos", "Grandes", "No hay fruto"],
    datasets: [
      {
        label: "Cantidad de Frutos",
        data: [frutos.pequeños, frutos.medianos, frutos.grandes, frutos.sinFrutos],
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        hoverOffset: 4,
        borderColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 16,
          fontStyle: "bold",
        },
      },
      title: {
        display: true,
        fontSize: 18,
        fontStyle: "bold",
        text: `Distribución de Frutos - Barras`,
      },
    },
  };

  return (
    <div>
      <Doughnut data={doughnutData} options={options} />
    </div>
  );
};

export default DoughnutChart;
