import { useEffect } from "react";
import DoughnutChart from "../components/DoughnutChart";
import SectorBarChart from "../components/SectorBarChart";
import RankingChart from "../components/ProductionBarChart";
import useCosecha from "../hooks/Cosecha/useCosecha";
import ClockTime from "../components/ClockTime"; // Importa el componente Clock

const Scorpius1 = () => {
  const { cosechaData, fetchCosechaData, rankingData, fetchAllRankings } = useCosecha();
  const codigoFundo = "F00001";
  const sectores = ["S00001", "S00002", "S00003", "S00004"];

  useEffect(() => {
    fetchCosechaData(codigoFundo);
    fetchAllRankings(codigoFundo);
  }, [codigoFundo, fetchCosechaData, fetchAllRankings]);

  const renderRankingChart = (data, tamañoFruto) => (
    <div className="w-full md:w-1/2 xl:w-1/4 px-2 mb-4">
      <div className="bg-white rounded-lg shadow-md p-4 h-[300px] xl:h-[320px] flex items-center justify-center">
        <RankingChart data={data} tamañoFruto={tamañoFruto} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f232bb3] via-[#707078ba] to-[#1f232b]"> {/* Fondo digitalizado */}
      <div className="p-4 sm:p-6 lg:p-8 transition-all duration-300 lg:ml-[80px] xl:ml-[80px]">
        {/* Encabezado con título y reloj */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            {cosechaData?.fundo?.nombre}
          </h1>
          <div className="flex-shrink-0">
            <ClockTime /> {/* Reloj en el extremo derecho */}
          </div>
        </div>

        {/* Contenedor */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Doughnut Chart */}
          <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <DoughnutChart codigoFundo={codigoFundo} />
          </div>

          {/* Sector charts container */}
          <div className="col-span-1 xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sectores.map((sector) => (
              <div
                key={sector}
              >
                <SectorBarChart
                  codigoFundo={codigoFundo}
                  codigoSector={sector}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rankings section */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Rankings por Tamaño de Fruto
          </h2>

          {rankingData.isLoading ? (
            <div className="flex justify-center items-center h-[200px] sm:h-[300px] lg:h-[400px]">
              <p className="text-lg">Cargando rankings...</p>
            </div>
          ) : rankingData.error ? (
            <div className="flex justify-center items-center h-[200px] sm:h-[300px] lg:h-[400px]">
              <p className="text-lg text-red-500">Error: {rankingData.error}</p>
            </div>
          ) : (
            <div className="flex flex-wrap -mx-2">
              {renderRankingChart(rankingData.grande, "Grande")}
              {renderRankingChart(rankingData.mediano, "Mediano")}
              {renderRankingChart(rankingData.pequeño, "Pequeño")}
              {renderRankingChart(rankingData.noHayFruto, "No hay fruto")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scorpius1;