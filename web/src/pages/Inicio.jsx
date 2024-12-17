import React, { useEffect } from 'react';
import MapaCalor from '../components/MapaCalor';

const Inicio = () => {
  const codigoFundo = 'F00001'; // Código de fundo hardcodeado, podrías pasarlo como parámetro

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Visualización de Fundo</h1>
        <MapaCalor codigoFundo={codigoFundo} />
      </div>
  );
};

export default Inicio;

