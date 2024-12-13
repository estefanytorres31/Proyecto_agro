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
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"],
        hoverBackgroundColor: ["rgba(244, 6, 6, 0.8)", "rgba(255, 128, 1, 0.8)", "rgba(82, 211, 44, 0.8)", "rgba(196, 196, 196, 0.8)"],
        borderColor: ["#a80505", "#b35b01", "#2e8b1c", "#8a8a8a"],
        borderWidth: 2,
        cutout: "60%",
        hoverOffset: 8,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 5, // Bordes redondeados para las barras
        barPercentage: 0.8, // Ancho de las barras en proporción al espacio
        categoryPercentage: 0.8, // Espaciado entre grupos de barras
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permitir ajuste responsivo del gráfico
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#333",
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#eaeaea"
        },
        ticks: {
          color: "#333",
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div style={styles.container }>
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
    //backgroundColor: "#fff",
    borderRadius: "10px",
    //padding: "20px",
    //boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //margin: "20px 30px 30px", // Separación vertical adicional entre contenedores
    maxWidth: "100%", // Tamaño del contenedor
    width: "100%", // Ocupa el 100% del contenedor padre
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: "10px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "15px", // Tamaño de letra
    color: "#333",
    fontWeight: "600",
    margin: "0",
  },
  loading: {
    fontSize: "1rem",
    color: "#FF6347",
    textAlign: "center",
    border: "2px solid #FF6347",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "20px",
  },
  chartContainer: {
    width: "100%",
    height: "100%", // Tamaño adecuado para cualquier pantalla
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "10px", // Espaciado adicional entre elementos del mismo contenedor
  }
};

export default SectorBarChart;
