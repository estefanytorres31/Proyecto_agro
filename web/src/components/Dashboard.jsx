import DoughnutChart from "./DoughnutChart";
import SectorBarChart from "./SectorBarChart";
import ProductionBarChart from "./ProductionBarChart";

const Dashboard = () => {
  const codigoFundo = "F00001";
  
  const sectores = ["S00001", "S00002", "S00003", "S00004"];

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center mb-8">SCORPIUS 1</h1>
      
      {/* Gráfico de Dona en el centro */}
      <div className="flex justify-center mb-8">
        <DoughnutChart codigoFundo={codigoFundo} />
      </div>
      
      {/* Gráficos de barras para cada sector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {sectores.map((sector) => (
          <SectorBarChart key={sector} codigoFundo={codigoFundo} codigoSector={sector} />
        ))}
        
        <ProductionBarChart tamañoFruto="Grande" codigoFundo={codigoFundo}  />
        <ProductionBarChart tamañoFruto="Mediano" codigoFundo={codigoFundo} />
        <ProductionBarChart tamañoFruto="Pequeño" codigoFundo={codigoFundo}/>
        <ProductionBarChart tamañoFruto="No hay fruto"  codigoFundo={codigoFundo} />
      </div>
    </div>
  );
};

export default Dashboard;
