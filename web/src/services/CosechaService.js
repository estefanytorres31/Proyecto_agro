import apiClient from "../API/apiClient";

// Utilidad para manejar errores de manera consistente
const handleApiError = (error, endpoint) => {
  console.error(`Error en ${endpoint}:`, error);
  return null;
};

// Utilidad para hacer requests
const apiRequest = async (method, endpoint, options = {}) => {
  try {
    const response = await apiClient[method](endpoint, options);
    console.log(`Respuesta de ${endpoint}:`, response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, endpoint);
  }
};

export const fundoAPI = {
    // Se mantiene igual ya que sigue funcionando por codigoFundo
    getCantidad: (codigoFundo) => 
      apiRequest('get', `/api/fundo/cantidad/${codigoFundo}`),
    
    // Método para obtener el total sin considerar el fundo
    getTotal: () => 
      apiRequest('post', '/api/fundo/total')
  };
  
  // Endpoints relacionados con Sector
  export const sectorAPI = {
    // Método para obtener el cálculo de un sector, pero aquí se puede usar el nombre del sector para filtrarlo
    getCalculo: (codigoFundo, nombreSector) => {
      if (nombreSector) {
        // Si se pasa el nombre del sector, se filtra por nombre
        return apiRequest('get', `/api/sector/calculo/nombre/${nombreSector}`);
      } else {
        // Si no se pasa el nombre, filtra por código de fundo
        return apiRequest('get', `/api/sector/calculo/${codigoFundo}`);
      }
    },
    
    // Método para obtener el total filtrado por el nombre del sector
    getTotal: (nombreSector) =>
      apiRequest('get', `/api/sector/total/${nombreSector}`)
  };
  
  // Endpoints relacionados con Cosecha y Rankings
  export const cosechaAPI = {
    getRanking: (tamFruto, codFundo) =>
      apiRequest('get', `/api/cosecha/ranking/${codFundo}/${tamFruto}`),
    
    getUltima: (codigoFundo) =>
      apiRequest('get', `/api/cosecha/ultima/${codigoFundo}`),
    
    getRankingGlobal: (tamFruto) =>
      apiRequest('get', `/api/ranking/global/${tamFruto}`)
  };
  