import { useEffect } from "react";
import DoughnutChart from "../components/DoughnutChart";
import SectorBarChart from "../components/SectorBarChart";
import ClockTime from "../components/ClockTime";
import useCosecha from "../hooks/Cosecha/useCosecha";

const Fundo1 = () => {
    const { cosechaData, fetchCosechaData, fetchAllRankings } = useCosecha();
    const codigoFundo = "F00001";
    const sectores = ["S00001", "S00002", "S00003", "S00004"];

    useEffect(() => {
        fetchCosechaData(codigoFundo);
        fetchAllRankings(codigoFundo);
    }, [codigoFundo, fetchCosechaData, fetchAllRankings]);

    if (!cosechaData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#c4c4c4f1] via-[#c8c8c8ea] to-[#dadadaf1]">
            <div className="sm:p-6 lg:p-8 transition-all duration-300">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide uppercase">
                        {cosechaData?.fundo?.nombre}
                    </h1>
                    <div className="flex-shrink-0">
                        <ClockTime /> {/* Reloj en el extremo derecho */}
                    </div>
                </div>

                {/* Contenedor */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Gráfico de Dona */}
                    <div className="col-span-1 lg:col-span-1 flex justify-center items-center bg-white rounded-lg shadow-md p-6">
                        <DoughnutChart codigoFundo={codigoFundo} />
                    </div>

                    {/* Espacio reservado para Mapa de Calor */}
                    <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-md p-6 flex justify-center items-center">
                        <p className="text-gray-500">Mapa de calor (en desarrollo)</p>
                    </div>
                </div>

                {/* Gráficos de Barras */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {sectores.map((sector) => (
                        <div key={sector} className="flex justify-center items-center bg-white rounded-lg shadow-md p-4">
                            <SectorBarChart codigoFundo={codigoFundo} codigoSector={sector} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fundo1;
