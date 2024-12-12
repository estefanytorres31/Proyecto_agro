/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useCosecha from '../hooks/Cosecha/useCosecha';

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

  if (!hasData || !sector?.frutos) return null;

  const data = {
    labels: ["Pequeños", "Medianos", "Grandes", "Sin Frutos"],
    datasets: [
      {
        label: `Sector ${sector?.sector?.nombre || "Cargando..."}`,
        data: [
          sector?.frutos?.pequeños || 0,
          sector?.frutos?.medianos || 0,
          sector?.frutos?.grandes || 0,
          sector?.frutos?.sinFrutos || 0
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
        beginAtZero: true,
        min: 0,
        max: sector?.frutos?.pequeños + sector?.frutos?.medianos + sector?.frutos?.grandes + sector?.frutos?.sinFrutos,
      }
    }
  };

  return (
    <div>
      <h3>Gráfico de Frutos - {sector?.sector?.nombre || "Cargando..."}</h3>
      {sector?.isLoading ? (
        <p>Cargando datos...</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default SectorBarChart;
