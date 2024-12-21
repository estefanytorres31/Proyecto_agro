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
      // Get cursor position relative to the grid
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left + 5; // Add small offset
      const y = e.clientY - rect.top - 40; // Position above cursor
      
      setHoverPosition({ x, y });
      setHoverPlant(planta);
    }
  };

  const handleTouchStart = (planta) => {
    setHoverPlant(hoverPlant?.codigo_planta === planta.codigo_planta ? null : planta);
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
        className="
          border-2 rounded-lg shadow-md transition-all duration-100 mb-8
          w-full max-w-[95vw] mx-auto
          md:max-w-none
          overflow-hidden
        "
      >
        <div 
          className="
            flex items-center justify-between p-4 cursor-pointer bg-gray-50
            sticky top-16 z-10 md:static
            border-b border-gray-200
          "
          onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-700 truncate mr-2">
            Sector {sector}
          </h3>
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <FaLeaf className="text-green-500" />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {sectorData.length} Plantas
            </span>
          </div>
        </div>

        {(selectedSector === sector || sectores.length === 1) && (
          <div 
            ref={gridRef} 
            className="
              p-2 md:p-4 bg-gray-50 relative
              min-h-[200px]
            "
          >
            <div 
              className="
                grid grid-flow-row auto-rows-max
                grid-cols-[repeat(auto-fill,minmax(35px,1fr))]
                sm:grid-cols-[repeat(auto-fill,minmax(40px,1fr))]
                md:grid-cols-[repeat(auto-fill,minmax(45px,1fr))]
                gap-2 md:gap-3
                w-full
              "
            >
              {sectorData.map((planta, index) => {
                const plantDetails = getPlantDetails(planta.tamaño_fruto);
                return (
                  <div 
                    key={`${planta.codigo_planta}-${index}`}
                    className="relative group touch-manipulation"
                    onMouseMove={(e) => handleMouseMove(e, planta)}
                    onMouseLeave={() => setHoverPlant(null)}
                    onTouchStart={() => handleTouchStart(planta)}
                  >
                    <div 
                      className={`
                        w-full aspect-square rounded-lg
                        ${plantDetails.bg} ${plantDetails.border}
                        border-2 shadow-sm md:shadow-md
                        flex items-center justify-center
                        transition-transform duration-200
                        group-hover:scale-105 md:group-hover:scale-110
                      `}
                    >
                      {plantDetails.icon}
                    </div>
                    
                    {hoverPlant?.codigo_planta === planta.codigo_planta && (
                      <div 
                        className="
                          absolute z-50
                          bg-white/95 backdrop-blur-sm
                          shadow-lg 
                          rounded-lg 
                          py-1 px-2
                          border border-gray-200
                          text-xs
                          text-gray-700
                          whitespace-nowrap
                          pointer-events-none
                        "
                        style={{
                          left: `${hoverPosition.x}px`,
                          top: `${hoverPosition.y}px`,
                        }}
                      >
                        <div className="font-medium">{planta.codigo_planta}</div>
                        <div>{plantDetails.text}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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
    <div className="
      space-y-4 md:space-y-6 
      p-4 md:p-6 
      bg-white rounded-lg shadow-sm
      mt-16 md:mt-0
    ">
      <h2 className="
        text-xl md:text-2xl 
        font-bold 
        text-center 
        text-gray-800 
        mb-4
      ">
        Mapa de Plantas - Fundo {fundoCodigo}
      </h2>
      {sectores.map(renderSectorGrid)}
    </div>
  );
};

export default FundoGrid;

