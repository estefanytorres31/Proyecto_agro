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
        beginAtZero: true
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Gráfico de Frutos - {sector?.sector?.nombre || "Cargando..."}</h3>
      </div>
      {sector?.isLoading ? (
        <div style={styles.loading}>Cargando datos...</div>
      ) : (
        <div style={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    width: "calc(80%)", // Ajuste para que ocupe la mitad de un contenedor 2x2
    margin: "20px",
    display: "inline-block", // Para permitir que los elementos se alineen en una cuadrícula
    verticalAlign: "top",
  },
  header: {
    marginBottom: "10px",
  },
  title: {
    fontSize: "15px",
    color: "#333",
    textAlign: "left", // Título alineado a la izquierda
    fontWeight: "600",
  },
  loading: {
    fontSize: "1rem",
    color: "#FF6347",
    textAlign: "center",
    border: "2px solid #FF6347",
    borderRadius: "10px",
    marginTop: "20px",
  },
  chartContainer: {
    width: "100%",
    height: "150px", // Ajustamos para que tenga un tamaño consistente
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }
};

export default SectorBarChart;
