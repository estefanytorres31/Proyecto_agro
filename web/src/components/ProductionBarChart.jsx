/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import useCosecha from '../hooks/Cosecha/useCosecha';

const BarChart = ({ tamañoFruto, codigoFundo }) => {
  const { sectorData, fetchSectorData } =  useCosecha();
  useEffect(() => {
    fetchSectorData(codigoFundo, codigoSector);
  }, [codigoFundo, codigoSector, fetchSectorData]);

  const data = {
    labels: ["Pequeños", "Medianos", "Grandes", "No hay fruto"],
    datasets: [
      {
        label: `Sector ${sectorData.sector ? sectorData.sector.nombre : ""}`,
        data: [
          sectorData.frutos.pequeños,
          sectorData.frutos.medianos,
          sectorData.frutos.grandes,
          sectorData.frutos.sinFrutos
        ],
        backgroundColor: ["#FF6347", "#FFA500", "#32CD32", "#808080"],
        borderColor: "#FFFFFF",
        borderWidth: 1
      }
    ]
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h3>Gráfico de Frutos - {sectorData.sector ? sectorData.sector.nombre : "Cargando..."}</h3>
      {sectorData.isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default BarChart;
