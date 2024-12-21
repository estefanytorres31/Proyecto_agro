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

// Endpoints relacionados con Fundo
export const fundoAPI = {
  getCantidad: (codigoFundo) => 
    apiRequest('get', `/api/fundo/cantidad/${codigoFundo}`),
  
  getTotal: () => 
    apiRequest('post', '/api/fundo/total')
};

// Endpoints relacionados con Sector
export const sectorAPI = {
  getCalculo: (codigoFundo, codigoSector) =>
    apiRequest('get', `/api/sector/calculo/${codigoFundo}/${codigoSector}`),
  
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