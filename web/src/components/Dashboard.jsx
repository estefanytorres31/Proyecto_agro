import { useEffect } from "react";
import DoughnutChart from "./DoughnutChart";
import SectorBarChart from "./SectorBarChart";
import RankingChart from "./ProductionBarChart";
import useCosecha from '../hooks/Cosecha/useCosecha';

const Dashboard = () => {
  const { cosechaData, fetchCosechaData, rankingData, fetchAllRankings } = useCosecha();

  const codigoFundo = "F00001";
  const sectores = ["S00001", "S00002", "S00003", "S00004"];

  useEffect(() => {
    fetchCosechaData(codigoFundo);
    fetchAllRankings(codigoFundo);
  }, [codigoFundo, fetchCosechaData, fetchAllRankings]);

  const renderRankingChart = (data, tamañoFruto) => (
    <div className="w-full md:w-1/2 lg:w-1/4 p-2">
      <div className="bg-white rounded-lg shadow-md p-4 h-[300px]">
        <RankingChart data={data} tamañoFruto={tamañoFruto} />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center mb-8">
        {cosechaData?.fundo?.nombre}
      </h1>
      
      {/* Gráfico de Dona en el centro */}
      <div className="flex justify-center mb-8">
        <DoughnutChart codigoFundo={codigoFundo} />
      </div>
      
      {/* Gráficos de barras para cada sector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {sectores.map((sector) => (
          <SectorBarChart key={sector} codigoFundo={codigoFundo} codigoSector={sector} />
        ))}
      </div>

      {/* Gráficos de ranking */}
      <h2 className="text-2xl text-center mb-4">Rankings por Tamaño de Fruto</h2>
      {rankingData.isLoading ? (
        <p className="text-center">Cargando rankings...</p>
      ) : rankingData.error ? (
        <p className="text-center text-red-500">Error: {rankingData.error}</p>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {renderRankingChart(rankingData.grande, 'Grande')}
          {renderRankingChart(rankingData.mediano, 'Mediano')}
          {renderRankingChart(rankingData.pequeño, 'Pequeño')}
          {renderRankingChart(rankingData.noHayFruto, 'No hay fruto')}
        </div>
      )}
    </div>
  );
};

export default Dashboard;