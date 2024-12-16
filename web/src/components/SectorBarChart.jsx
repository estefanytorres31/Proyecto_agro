/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "chart.js";
import useCosecha from '../hooks/Cosecha/useCosecha';

Chart.register(ChartDataLabels);
const SectorBarChart = ({ codigoFundo, codigoSector }) => {
  const { sectorData, fetchSectorData } = useCosecha();
  const sector = sectorData[codigoSector];
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    fetchSectorData(codigoFundo, codigoSector);
  }, [codigoFundo, codigoSector, fetchSectorData]);

  useEffect(() => {
    if (sector && sector.frutos && (sector.frutos.pequeños || sector.frutos.medianos || sector.frutos.grandes || sector.frutos.sinFrutos)) {
      setHasData(true);
    } else {
      setHasData(false);
    }
  }, [sector]);

  const frutos = sector?.frutos || {
    pequeños: 0,
    medianos: 0,
    grandes: 0,
    sinFrutos: 0,
  };

  const data = {
    labels: ["Pequeños", "Medianos", "Grandes", "Sin Frutos"],
    datasets: [
      {
        label: `Sector ${sector?.sector?.nombre || "Cargando..."}`,
        data: [
          frutos.pequeños,
          frutos.medianos,
          frutos.grandes,
          frutos.sinFrutos,
        ],
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        hoverBackgroundColor: ["rgba(244, 6, 6, 0.8)", "rgba(255, 128, 1, 0.8)", "rgba(82, 211, 44, 0.8)", "rgba(196, 196, 196, 0.8)"],
        borderColor: ["#a80505", "#b35b01", "#2e8b1c", "#8a8a8a"],
        borderWidth: 2,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md max-w-full w-full flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{`Gráfico del Sector ${
          sector?.sector?.nombre || "Cargando..."
        }`}</h2>
      </div>
      <div className="w-full h-full p-4 bg-gray-100 rounded-lg shadow-sm mt-2">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default SectorBarChart;

