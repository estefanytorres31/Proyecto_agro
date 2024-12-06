import { useEffect, useRef } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale } from "chart.js";
import useCosecha from "../hooks/Cosecha/useCosecha"; 

ChartJS.register(ArcElement, Tooltip, Legend, Title, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const { cosechaData, fetchCosechaData } = useCosecha();
  const chartRefDoughnut = useRef(null);
  const chartRefBar = useRef(null);

  useEffect(() => {
    fetchCosechaData("F00001"); 

    return () => {
      if (chartRefDoughnut.current) {
        chartRefDoughnut.current.destroy();
      }
      if (chartRefBar.current) {
        chartRefBar.current.destroy();
      }
    };
  }, [fetchCosechaData]);

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 16,
          fontStyle: "bold",
        },
      },
      title: {
        display: true,
        fontSize: 20,
        fontStyle: "bold",
        text: `Distribución de Frutos - ${cosechaData.fundo?.nombre}`,
      },
    },
  };

  const doughnutData = {
    labels: ["Pequeños", "Medianos", "Grandes", "No hay fruto"],
    datasets: [
      {
        label: "Cantidad de Frutos",
        data: [
          cosechaData.frutos.pequeños,
          cosechaData.frutos.medianos,
          cosechaData.frutos.grandes,
          cosechaData.frutos.sinFrutos,
        ],
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        hoverOffset: 4,
        borderColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
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

  const barData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Cantidad de Frutos",
        data: [30, 35, 40, 25, 30, 40], // Aquí los datos de los meses pueden ser dinámicos
        backgroundColor: "#52d32c",
        borderColor: "#52d32c",
        borderWidth: 1,
      },
    ],
  };

  if (cosechaData.isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (cosechaData.error) {
    return <p>{cosechaData.error}</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", width: "100%" }}>
      <div style={{ width: "45%", maxWidth: "500px", margin: "0 auto" }}>
        {cosechaData.frutos.pequeños || cosechaData.frutos.medianos || cosechaData.frutos.grandes || cosechaData.frutos.sinFrutos ? (
          <Doughnut ref={chartRefDoughnut} data={doughnutData} options={doughnutOptions} />
        ) : (
          <p>No hay datos disponibles.</p>
        )}
      </div>
      
      <div style={{ width: "45%", maxWidth: "400px", margin: "0 auto" }}>
        <Bar ref={chartRefBar} data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
