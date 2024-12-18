import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const FundoGrid = () => {
  const [fundoData, setFundoData] = useState([]);

  useEffect(() => {
    const fetchFundoData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cosecha/ultima/F00001');
        setFundoData(response.data);
      } catch (error) {
        console.error('Error fetching fundo data:', error);
      }
    };
    fetchFundoData();
  }, []);

  const getColorForFruit = (size) => {
    switch (size) {
      case 'Grande':
        return 'bg-green-500';
      case 'Mediano':
        return 'bg-yellow-500';
      case 'Pequeño':
        return 'bg-red-500';
      case 'No hay fruto':
        return 'bg-gray-300';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {['S00001', 'S00002', 'S00003', 'S00004'].map((sector) => (
        <div key={sector} className="border border-gray-300">
          <h3 className="text-center mb-2 text-lg font-medium">Sector {sector}</h3>
          {/* Grid ajustable */}
          <div className="grid grid-flow-row auto-rows-max grid-cols-[repeat(auto-fit,_20px)] gap-0">
            {fundoData
              .filter((planta) => planta.planta_codigo_sector === sector)
              .map((planta, index) => (
                <div
                  key={`${planta.codigo_planta}-${index}`}
                  className={`w-5 h-5 ${getColorForFruit(planta.tamaño_fruto)} border border-black`}
                  style={{ margin: 0, padding: 0 }}
                ></div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FundoGrid;
