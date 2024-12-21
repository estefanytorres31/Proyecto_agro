import { useEffect, useState } from "react";
import DoughnutChart from "../components/DoughnutChart";
import SectorBarChart from "../components/SectorBarChart";
import RankingChart from "../components/ProductionBarChart";
import useCosecha from "../hooks/Cosecha/useCosecha";
import ClockTime from "../components/ClockTime";
import Loading from "../components/Loading";

const Inicio = () => {
  const { 
    cosechaData, 
    fetchCosechaTotalData, 
    rankingData, 
    fetchRankingGlobal,
    fetchSectorTotalData
  } = useCosecha();
  const [isLoading, setIsLoading] = useState(true);
  const sectores = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchCosechaTotalData(),
          fetchRankingGlobal(),
          ...sectores.map(sector => fetchSectorTotalData(sector))
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchCosechaTotalData, fetchRankingGlobal, fetchSectorTotalData]);

  const renderRankingChart = (data, tamañoFruto) => (
    <div className="w-full md:w-1/2 xl:w-1/4 px-2 mb-4">
      <div className="bg-[#ffff] rounded-lg shadow-md p-4 h-[300px] xl:h-[320px] flex items-center justify-center">
        <RankingChart data={data} tamañoFruto={tamañoFruto} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#c4c4c4f1] via-[#c8c8c8ea] to-[#dadadaf1]">
      <div className="p-3 sm:p-6 lg:p-8 transition-all duration-300 lg:ml-[80px] xl:ml-[80px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Home
          </h1>
          <div className="flex-shrink-0">
            <ClockTime />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loading />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
              <div className="col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                <DoughnutChart />
              </div>

              <div className="col-span-1 xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectores.map((sector) => (
                  <div key={sector}>
                    <SectorBarChart nombreSector={sector} />
                  </div>
                ))}
              </div>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default Inicio;

