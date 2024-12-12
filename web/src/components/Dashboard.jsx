import { useEffect } from "react";
import DoughnutChart from "./DoughnutChart";
import SectorBarChart from "./SectorBarChart";
import ProductionBarChart from "./ProductionBarChart";
import useCosecha from '../hooks/Cosecha/useCosecha';

const Dashboard = () => {
  const { cosechaData, fetchCosechaData } = useCosecha();

  const codigoFundo = "F00001";
  const sectores = ["S00001", "S00002", "S00003", "S00004"];
  const tamaños=["Grande", "Mediano", "Pequeño", "No hay fruto"];

  useEffect(() => {
    fetchCosechaData(codigoFundo);
  }, [codigoFundo, fetchCosechaData]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sectores.map((sector) => (
          <SectorBarChart key={sector} codigoFundo={codigoFundo} codigoSector={sector} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tamaños.map((tamaño) => (
          <ProductionBarChart key={tamaño} tamañoFruto={tamaño} codigoFundo={codigoFundo} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
