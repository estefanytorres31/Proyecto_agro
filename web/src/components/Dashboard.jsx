import DoughnutChart from "./DoughnutChart";
import SectorBarChart from "./SectorBarChart";
import ProductionBarChart from "./ProductionBarChart";

const Dashboard = () => {
  const codigoFundo = "F00001";

  return (
    <div className="p-6 bg-[#ededee]">
      <h1 className="text-3xl text-left mb-10">SCORPIUS 1</h1>

      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Gráfico de Dona */}
        <div className="flex-1 md:w-1/3">
          <DoughnutChart codigoFundo={codigoFundo} />
        </div>

        {/* Gráficos de Barras */}
        <div className="flex-1 md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Gráficos SectorBarChart */}
          <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00001" />
          <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00002" />
          <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00003" />
          <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00004" />

          {/* Gráficos ProductionBarChart */}
          <ProductionBarChart tamañoFruto="Grande" codigoFundo={codigoFundo} />
          <ProductionBarChart tamañoFruto="Mediano" codigoFundo={codigoFundo} />
          <ProductionBarChart tamañoFruto="Pequeño" codigoFundo={codigoFundo} />
          <ProductionBarChart tamañoFruto="No hay fruto" codigoFundo={codigoFundo} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
