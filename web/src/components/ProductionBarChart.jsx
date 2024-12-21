/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Registra el plugin
);

const RankingChart = ({ data, tamañoFruto }) => {
  // Selecciona la clave correspondiente en los datos basándose en el tamaño del fruto
  const frutoKey = tamañoFruto === 'No hay fruto' ? 'frutas_no_hay_frutos' : `frutas_${tamañoFruto.toLowerCase()}s`;

  const chartData = {
    labels: data.map(item => item.codigo_planta), // Etiquetas: códigos de planta
    datasets: [
      {
        label: `Cantidad de frutas ${tamañoFruto.toLowerCase()}`, // Etiqueta del conjunto de datos
        data: data.map(item => item[frutoKey]), // Datos a graficar
        backgroundColor: ["#f40606", "#ff8001", "#52d32c", "#c4c4c4"], // Colores principales para las barras
        hoverBackgroundColor: ["rgba(244, 6, 6, 0.8)", "rgba(255, 128, 1, 0.8)", "rgba(82, 211, 44, 0.8)", "rgba(196, 196, 196, 0.8)"], // Colores al pasar el cursor
        borderColor: ["#a80505", "#b35b01", "#2e8b1c", "#8a8a8a"], // Borde de las barras
        borderWidth: 1, // Ancho del borde
        borderRadius: 8, // Bordes redondeados para un look moderno
        barPercentage: 0.6, // Ancho relativo de las barras
        categoryPercentage: 0.7, // Espaciado entre las barras
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Gráfico horizontal para mayor legibilidad en dashboards compactos
    elements: {
      bar: {
        borderWidth: 1, // Ancho del borde de cada barra
      },
    },
    responsive: true, // Ajusta el tamaño al contenedor
    maintainAspectRatio: false, // Permite ajustar el alto manualmente
    plugins: {
      legend: {
        display: false, // Oculta la leyenda para ahorrar espacio
      },
      title: {
        display: true, // Muestra el título
        text: `Ranking de plantas por cantidad de frutas ${tamañoFruto.toLowerCase()}`, // Texto del título
        color: '#000', // Color del título
        font: {
          size: 16, // Tamaño de fuente del título
          weight: 'bold', // Negrita
          family: 'Arial, sans-serif', // Tipografía moderna
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      tooltip: {
        enabled: true, // Habilita tooltips
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro para modernidad
        titleColor: '#ffffff', // Color del título del tooltip
        bodyColor: '#ffffff', // Color del texto del tooltip
        cornerRadius: 8, // Bordes redondeados del tooltip
        padding: 10, // Espaciado interno del tooltip
      },
      datalabels: { // Configuración de los valores dentro de las barras
        color: '#000', // Color blanco para el texto (se ve mejor dentro de las barras)
        font: {
          weight: 'bold', // Negrita
          size: 12, // Tamaño del texto
        },
        anchor: 'center', // Posiciona el texto en el centro de la barra
        align: 'center', // Alinea el texto dentro de la barra
        formatter: (value) => value.toLocaleString(), // Formatea los números (opcional)
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Comienza en 0 para mayor claridad
        grid: {
          color: '#e0e0e0', // Color de las líneas de la grilla
          borderDash: [5, 5], // Líneas punteadas para menos ruido visual
        },
        ticks: {
          color: '#666666', // Color de las etiquetas
          font: {
            size: 12, // Tamaño de las etiquetas
          },
        },
      },
      y: {
        grid: {
          display: false, // Oculta las líneas de la grilla horizontal
        },
        ticks: {
          color: '#333333', // Color de las etiquetas
          font: {
            size: 12, // Tamaño de las etiquetas
          },
        },
      },
    },
    animation: {
      duration: 800, // Duración de la animación
      easing: 'easeOutQuart', // Efecto de suavizado moderno
    },
  };

  return (
    <div style={{ height: '280px', width: '100%', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      {/* Contenedor estilizado */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RankingChart;
