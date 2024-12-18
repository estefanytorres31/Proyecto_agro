import React, { useEffect } from 'react';
import MapaCalor from '../components/MapaCalor';

const MapaCalor1 = () => {

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Visualización de Fundo</h1>
        <MapaCalor fundoCodigo="F00001" sectores={['S00001', 'S00002', 'S00003', 'S00004']} />
      </div>
  );
};

export default MapaCalor1;

