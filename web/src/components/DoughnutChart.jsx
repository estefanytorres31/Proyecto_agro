/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import useCosecha from "../hooks/Cosecha/useCosecha";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DoughnutChart = ({ codigoFundo }) => {
  const { cosechaData, fetchCosechaData } = useCosecha();

  useEffect(() => {
    fetchCosechaData(codigoFundo);
  }, [codigoFundo, fetchCosechaData]);

  if (cosechaData.isLoading) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Cargando datos...</p>;
  }

  if (cosechaData.error) {
    return <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>Error: {cosechaData.error}</p>;
  }

  const frutos = cosechaData?.frutos || { pequeños: 0, medianos: 0, grandes: 0, sinFrutos: 0 };

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
        position: "right",
        labels: {
          boxWidth: 18,
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 10, // Espaciado entre etiquetas
          color: "#333", // Color de texto
        },
      },
      title: {
        display: true,
        text: "Distribución de Frutos",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "#444", // Color del título
        padding: {
          top: 20,
          bottom: 20,
        },
        align: "left", // Centrar el título
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };
  
  // Asegúrate de que el contenedor se adapte al sidebar dinámicamente.
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const canvas = entry.target.querySelector("canvas");
      if (canvas) {
        canvas.style.width = `${entry.contentRect.width}px`;
        canvas.style.height = `${entry.contentRect.height}px`;
      }
    }
  });
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "var(--sidebar-width, 100px)", // Espacio dinámico según la barra lateral
        transition: "margin-left 0.3s ease-in-out",
        width: "calc(100% - var(--sidebar-width, 110px))",
        height: "100%",
      }}
    >
      <div
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "400px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}>
          <Doughnut data={doughnutData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
