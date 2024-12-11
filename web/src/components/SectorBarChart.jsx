/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import useCosecha from '../hooks/Cosecha/useCosecha';

const SectorBarChart = ({ codigoFundo, codigoSector }) => {
  const { sectorData, fetchSectorData } = useCosecha();
  console.log('Datos recibidos en BarChart',codigoSector , codigoFundo);

  useEffect(() => {
    fetchSectorData(codigoFundo, codigoSector);
  }, [codigoFundo, codigoSector, fetchSectorData]);

  const data = {
    labels: ["Pequeños", "Medianos", "Grandes", "Sin Frutos"],
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

export default SectorBarChart;
