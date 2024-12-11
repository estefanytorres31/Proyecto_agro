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
        backgroundColor: [
          "#f40606",
          "#ff8001",
          "#52d32c",
          "#c4c4c4"
        ],
        hoverBackgroundColor: [
          "rgba(244, 6, 6, 0.8)",
          "rgba(255, 128, 1, 0.8)",
          "rgba(82, 211, 44, 0.8)",
          "rgba(196, 196, 196, 0.8)"
        ],
        borderColor: ["#a80505", "#b35b01", "#2e8b1c", "#8a8a8a"],
        borderWidth: 2,
        cutout: "70%",
        hoverOffset: 8,
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
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: `Distribución de Frutos`,
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    layout: {
      padding: 20,
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div style={{
      width: "50%",
      margin: "0 auto",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "16px",
      padding: "20px",
      backgroundColor: "#fff",
    }}>
      <Doughnut data={doughnutData} options={options} />
    </div>
  );
};

export default DoughnutChart;