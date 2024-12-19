import React, { useEffect } from 'react';
import MapaCalor from '../components/MapaCalor';

const MapaCalor2 = () => {

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Visualización de Fundo</h1>
        <MapaCalor fundoCodigo="F00002" sectores={['S00005', 'S00006', 'S00007', 'S00008']} />
      </div>
  );
};

export default MapaCalor2;

