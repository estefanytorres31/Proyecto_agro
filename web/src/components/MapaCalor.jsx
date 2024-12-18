import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  FaLeaf, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaTree,
  FaMapMarkerAlt
} from 'react-icons/fa';

const FundoGrid = ({ fundoCodigo, sectores }) => {
  const [fundoData, setFundoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [hoverPlant, setHoverPlant] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchFundoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api-node.fundoscorpius.com/api/cosecha/ultima/${fundoCodigo}`);
        setFundoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fundo data:', error);
        setError('No se pudo cargar la información');
        setLoading(false);
      }
    };

    fetchFundoData();
  }, [fundoCodigo]);

  const handleMouseMove = (e, planta) => {
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      let x = e.clientX - gridRect.left;
      let y = e.clientY - gridRect.top - 10;
  
      // Asegura que la ventana no se salga del contenedor
      x = Math.max(0, Math.min(x, gridRect.width - 150)); // Ajusta 150 según el ancho de la ventana flotante.
      y = Math.max(0, Math.min(y, gridRect.height - 100)); // Ajusta 100 según la altura de la ventana flotante.
  
      setHoverPosition({ x, y });
    }
    setHoverPlant(planta);
  };
  
  const getPlantDetails = (size) => {
    switch (size) {
      case 'Grande':
        return {
          bg: 'bg-green-500',
          border: 'border-green-700',
          text: 'Fruto Grande',
          icon: <FaTree className="text-green-700" />,
        };
      case 'Mediano':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-700',
          text: 'Fruto Mediano',
          icon: <FaTree className="text-yellow-700" />,
        };
      case 'Pequeño':
        return {
          bg: 'bg-red-500',
          border: 'border-red-700',
          text: 'Fruto Pequeño',
          icon: <FaTree className="text-red-700" />,
        };
      case 'No hay fruto':
        return {
          bg: 'bg-gray-300',
          border: 'border-gray-500',
          text: 'Sin Fruto',
          icon: <FaMapMarkerAlt className="text-gray-500" />,
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-300',
          text: 'Sin registro',
          icon: <FaInfoCircle className="text-gray-500" />,
        };
    }
  };

  const renderSectorGrid = (sector) => {
    const sectorData = fundoData.filter((planta) => planta.planta_codigo_sector === sector);
    
    return (
      <div 
        key={sector} 
        className={`
          border-2 rounded-lg shadow-md transition-all duration-100 mb-8
          ${selectedSector === sector 
            ? 'border-green-500 scale-105' 
            : 'border-gray-300 hover:border-green-300'}
        `}
      >
        <div 
          className="flex items-center justify-between p-4 cursor-pointer bg-gray-50"
          onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
        >
          <h3 className="text-lg font-semibold text-gray-700 flex-shrink-0">
            Sector {sector}
          </h3>
          <div className="flex items-center space-x-3 ml-4">
            <FaLeaf className="text-green-500 flex-shrink-0" />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {sectorData.length} Plantas
            </span>
          </div>
        </div>

        {(selectedSector === sector || sectores.length === 1) && (
          <div ref={gridRef} className="p-4 bg-gray-50 relative mt-2">
            <div 
              className="
                grid grid-flow-row auto-rows-max 
                grid-cols-[repeat(auto-fit,_minmax(45px,_1fr))] 
                gap-3
              "
            >
              {sectorData.map((planta, index) => {
                const plantDetails = getPlantDetails(planta.tamaño_fruto);
                return (
                  <div 
                    key={`${planta.codigo_planta}-${index}`}
                    className="relative group"
                    onMouseMove={(e) => handleMouseMove(e, planta)}
                    onMouseLeave={() => setHoverPlant(null)}
                  >
                    <div 
                      className={`
                        w-full aspect-square rounded-lg 
                        ${plantDetails.bg} ${plantDetails.border}
                        border-2 shadow-md
                        flex items-center justify-center
                        transition-transform duration-200 
                        group-hover:scale-110
                      `}
                    >
                      {plantDetails.icon}
                    </div>
                    <div 
                      className="
                        absolute top-0 left-0 w-full h-full 
                        opacity-0 group-hover:opacity-100 
                        bg-black bg-opacity-50 
                        flex items-center justify-center 
                        text-white text-xs text-center 
                        transition-opacity duration-100 
                        rounded-lg
                      "
                    >
                      {plantDetails.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {hoverPlant && (
              <div 
                className="
                  absolute 
                  z-50 
                  bg-white 
                  shadow-lg 
                  rounded-lg 
                  p-3 
                  border 
                  border-gray-300
                  text-sm
                  text-gray-700
                  min-w-[150px]
                  whitespace-nowrap
                "
                style={{
                  transform: 'translate(-50%, -110%)', 
                  left: `${hoverPosition.x}px`,
                  top: `${hoverPosition.y}px`,
                }}
              >
                <div className="font-bold mb-1">Código de Planta</div>
                <div>{hoverPlant.codigo_planta}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Sector {hoverPlant.planta_codigo_sector}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin">
          <FaExclamationTriangle className="text-4xl text-yellow-500" />
        </div>
        <p className="ml-2 text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-red-50 p-4 rounded-lg">
        <FaInfoCircle className="text-2xl text-red-500 mr-2" />
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Mapa de Plantas - Fundo {fundoCodigo}
      </h2>
      {sectores.map(renderSectorGrid)}
    </div>
  );
};

export default FundoGrid;

