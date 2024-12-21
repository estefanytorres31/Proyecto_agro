import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import useCosecha from "../hooks/Cosecha/useCosecha";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DoughnutChart = ({ codigoFundo = null }) => {
  const { 
    cosechaData, 
    fetchCosechaData, 
    fetchCosechaTotalData 
  } = useCosecha();

  useEffect(() => {
    if (codigoFundo) {
      fetchCosechaData(codigoFundo);
    } else {
      fetchCosechaTotalData();
    }
  }, [codigoFundo, fetchCosechaData, fetchCosechaTotalData]);

  if (cosechaData.isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (cosechaData.error) {
    console.log(cosechaData.error)
    return <div>Error: {cosechaData.error}</div>;
  }

  const frutos = cosechaData?.frutos || { 
    pequeños: 0, 
    medianos: 0, 
    grandes: 0, 
    sinFrutos: 0 
  };

  const doughnutData = {
    labels: ["Pequeños", "Medianos", "Grandes", "No hay fruto"],
    datasets: [
      {
        label: "Cantidad de Frutos",
        data: [frutos.pequeños, frutos.medianos, frutos.grandes, frutos.sinFrutos],
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        hoverBackgroundColor: ["rgba(244, 6, 6, 0.8)", "rgba(255, 128, 1, 0.8)", "rgba(82, 211, 44, 0.8)", "rgba(196, 196, 196, 0.8)"],
        borderColor: ["#a80505", "#b35b01", "#2e8b1c", "#8a8a8a"],
        borderWidth: 2,
        cutout: "60%",
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 16,
          font: {
            size: 14,
          },
          padding: 10,
          color: "#333",
        },
      },
      title: {
        display: true,
        text: codigoFundo 
          ? `Distribución de Frutos - Fundo ${cosechaData.fundo?.nombre || codigoFundo}`
          : "Distribución Total de Frutos",
        font: {
          size: 18,
          weight: "bold",
          family: "Roboto, Arial, sans-serif",
        },
        color: "#444",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (value) => value,
        color: "#000",
        font: {
          weight: "bold",
          size: 12,
        },
        display: (context) => {
          return context.dataset.data[context.dataIndex] >= 0;
        }
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Doughnut data={doughnutData} options={options} />
    </div>
  );
};

export default DoughnutChart;