import DoughnutChart from "./DoughnutChart";
import SectorBarChart from "./SectorBarChart";
import ProductionBarChart from "./ProductionBarChart";

const Dashboard = () => {
  const codigoFundo = "F00001";

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center mb-8">SCORPIUS 1</h1>
      
      {/* Gráfico de Dona en el centro */}
      <div className="flex justify-center mb-8">
        <DoughnutChart codigoFundo={codigoFundo} />
      </div>
      
      {/* Gráficos de barras y rankings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00001" />
        <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00002" />
        <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00003" />
        <SectorBarChart codigoFundo={codigoFundo} codigoSector="S00004" />
        
        <ProductionBarChart tamañoFruto="Grande" codigoFundo={codigoFundo}  />
        <ProductionBarChart tamañoFruto="Mediano" codigoFundo={codigoFundo} />
        <ProductionBarChart tamañoFruto="Pequeño" codigoFundo={codigoFundo}/>
        <ProductionBarChart tamañoFruto="No hay fruto"  codigoFundo={codigoFundo} />
      </div>
    </div>
  );
};

export default Dashboard;
