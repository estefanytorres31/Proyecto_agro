import { useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import useCosecha from '../hooks/Cosecha/useCosecha';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const { cosechaData, fetchCosechaData, fetchRankingData } = useCosecha();

  useEffect(() => {
    // Código para obtener los datos de la cosecha para los sectores A, B, C, D del fundo F00001
    fetchCosechaData("F00001", "S00001");  // Sector A
    fetchCosechaData("F00001", "S00002");  // Sector B
    fetchCosechaData("F00001", "S00003");  // Sector C
    fetchCosechaData("F00001", "S00004");  // Sector D

    // Llamar a la API para el ranking
    fetchRankingData("Grande", "F00001");
  }, [fetchCosechaData, fetchRankingData]);

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

  const barDataTemplate = (sector, data) => ({
    labels: ["Grande", "Mediano", "Pequeño", "No hay"],
    datasets: [
      {
        label: `Sector ${sector}`,
        data: [
          data.grandes || 0,
          data.medianos || 0,
          data.pequeños || 0,
          data.sinFrutos || 0,
        ],
        backgroundColor: ["#52d32c", "#ff8001", "#f40606", "#c4c4c4"],
      },
    ],
  });

  const productionBarDataTemplate = (type) => ({
    labels: [`P${type}001`, `P${type}002`, `P${type}003`, `P${type}004`, `P${type}005`],
    datasets: [
      {
        label: "Producción",
        data: [100, 200, 300, 400, 500],
        backgroundColor: "#52d32c",
      },
    ],
  });

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

  if (cosechaData.isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (cosechaData.error) {
    return <p>{cosechaData.error}</p>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Sección superior: Dona y 4 barras verticales */}
      <div className="grid lg:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center">
          <Doughnut data={doughnutData} options={options} />
          <p className="text-center mt-2 font-semibold">Distribución General</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["A", "B", "C", "D"].map((sector) => (
            <div key={sector} className="flex flex-col items-center">
              <Bar data={barDataTemplate(sector, cosechaData.frutos)} options={options} />
              <p className="text-center mt-2 font-semibold">Sector {sector}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección inferior: 4 barras horizontales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["00", "01", "02", "03"].map((type) => (
          <div key={type} className="flex flex-col items-center">
            <Bar data={productionBarDataTemplate(type)} options={{ ...options, indexAxis: "y" }} />
            <p className="text-center mt-2 font-semibold">
              Producción {type === "00" ? "Grande" : type === "01" ? "Mediano" : type === "02" ? "Pequeño" : "No hay"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
