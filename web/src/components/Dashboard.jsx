import { useEffect } from "react";
import DoughnutChart from "./DoughnutChart";
import SectorBarChart from "./SectorBarChart";
import ProductionBarChart from "./ProductionBarChart";
import useCosecha from '../hooks/Cosecha/useCosecha';

const Dashboard = () => {
  const { cosechaData, fetchCosechaData } = useCosecha();

  const codigoFundo = "F00001";
  const sectores = ["S00001", "S00002", "S00003", "S00004"];

  useEffect(() => {
    fetchCosechaData(codigoFundo);
  }, [codigoFundo, fetchCosechaData]);

  return (
    <div className="p-6 bg-[#ededee]">
      <h1 className="text-3xl flex-col md:flex-row items-start gap-12">
        {cosechaData?.fundo?.nombre}
      </h1>

      {/* Contenedor principal */}
      <div className="flex flex-col-12 col-md-6 ">
        {/* Gráfico de Dona */}
        <div className="flex-1" style={{ height: "400px" }}>
          <DoughnutChart codigoFundo={codigoFundo} />
        </div>

        {/* Gráficos de Barras */}
        <div className="flex-1 'grid' grid sm:grid-cols-2 gap-1 items-center">
          {/* Gráficos SectorBarChart */}
          <div className="p-2">
            <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00001" />
          </div>
      
            <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00002" />
          
            <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00003" />
          
            <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00004" />

          /* Gráficos ProductionBarChart */
          <div className="bg-white p-2 shadow-md flex flex-wrap gap-2 justify-between">
            <div className="flex-1 min-w-[150px]">
              <ProductionBarChart tamañoFruto="Grande" codigoFundo={codigoFundo} />
            </div>
            <div className="flex-1 min-w-[150px]">
              <ProductionBarChart tamañoFruto="Mediano" codigoFundo={codigoFundo} />
            </div>
            <div className="flex-1 min-w-[150px]">
              <ProductionBarChart tamañoFruto="Pequeño" codigoFundo={codigoFundo} />
            </div>
            <div className="flex-1 min-w-[150px]">
              <ProductionBarChart tamañoFruto="No hay fruto" codigoFundo={codigoFundo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
