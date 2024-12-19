import { useEffect, useState } from "react";
import DoughnutChart from "../components/DoughnutChart";
import SectorBarChart from "../components/SectorBarChart";
import RankingChart from "../components/ProductionBarChart";
import useCosecha from "../hooks/Cosecha/useCosecha";
import ClockTime from "../components/ClockTime";

const Inicio = () => {
  const { fetchCosechaData, fetchAllRankings } = useCosecha();
  const [combinedCosechaData, setCombinedCosechaData] = useState(null);
  const [combinedRankingData, setCombinedRankingData] = useState(null);
  const codigosFundos = ["F00001", "F00002"];

  useEffect(() => {
    const fetchCombinedData = async () => {
      try {
        // Fetch data for all fundos in parallel
        const cosechaResults = await Promise.all(
          codigosFundos.map(codigo => fetchCosechaData(codigo))
        );
        
        const rankingResults = await Promise.all(
          codigosFundos.map(codigo => fetchAllRankings(codigo))
        );

        // Combine cosecha data
        const combinedCosecha = cosechaResults.reduce(
          (acc, data) => {
            if (data && data.frutos) {
              acc.pequeños += data.frutos.pequeños || 0;
              acc.medianos += data.frutos.medianos || 0;
              acc.grandes += data.frutos.grandes || 0;
              acc.sinFrutos += data.frutos.sinFrutos || 0;
            }
            return acc;
          },
          { pequeños: 0, medianos: 0, grandes: 0, sinFrutos: 0 }
        );

        // Combine ranking data with more robust merging
        const combinedRanking = rankingResults.reduce((acc, data) => {
          Object.keys(data || {}).forEach(key => {
            // Inicializar el arreglo si no existe
            if (!acc[key]) acc[key] = [];
            
            // Combinar y ordenar datos, eliminando duplicados
            acc[key] = [...acc[key], ...(data[key] || [])]
              .reduce((unique, item) => {
                // Asegurarse de que no haya elementos duplicados
                const exists = unique.some(u => 
                  u.nombre === item.nombre && u.cantidad === item.cantidad
                );
                return exists ? unique : [...unique, item];
              }, [])
              // Ordenar de mayor a menor cantidad
              .sort((a, b) => (b.cantidad || 0) - (a.cantidad || 0));
          });
          return acc;
        }, {});

        // Actualizar estados
        setCombinedCosechaData(combinedCosecha);
        setCombinedRankingData(combinedRanking);

      } catch (error) {
        console.error("Error combinando datos:", error);
        // Manejar el error de manera más amigable
        alert("No se pudieron cargar los datos. Por favor, intente nuevamente.");
      }
    };

    // Solo llamar si los hooks están definidos
    if (fetchCosechaData && fetchAllRankings) {
      fetchCombinedData();
    }
  }, [fetchCosechaData, fetchAllRankings]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#c4c4c4f1] via-[#c8c8c8ea] to-[#dadadaf1]">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide uppercase">
            Informe de Cosechas
          </h2>
          <div className="flex-shrink-0">
            <ClockTime />
          </div>
        </div>

        {/* Sección de Gráficos de Cosecha */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
          {/* Gráfico de Dona */}
          <div className="col-span-2 bg-white rounded-lg shadow-md p-4 flex justify-center items-center">
            {combinedCosechaData ? (
              <DoughnutChart 
                data={combinedCosechaData} 
                title="Distribución Total de Frutos" 
              />
            ) : (
              <div className="text-center w-full">
                <p className="text-gray-500 animate-pulse">Cargando datos...</p>
              </div>
            )}
          </div>

          {/* Gráficos de Barras por Sector */}
          <div className="col-span-3 grid grid-cols-2 gap-4">
            {["pequeños", "medianos", "grandes", "sinFrutos"].map((categoria) => (
              <div 
                key={categoria} 
                className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-xl"
              >
                {combinedCosechaData ? (
                  <SectorBarChart
                    categoria={categoria}
                    data={combinedCosechaData[categoria]}
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 animate-pulse">
                      Cargando {categoria}...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Rankings */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Rankings Totales por Tamaño de Fruto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["grande", "mediano", "pequeño", "noHayFruto"].map((tamañoFruto) => (
              <div 
                key={tamañoFruto} 
                className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-xl"
              >
                {combinedRankingData ? (
                  <RankingChart
                    tamañoFruto={tamañoFruto}
                    data={combinedRankingData[tamañoFruto] || []}
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 animate-pulse">
                      Cargando ranking {tamañoFruto}...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;