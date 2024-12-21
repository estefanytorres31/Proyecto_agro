import { useState, useCallback, useMemo } from "react";
import CosechaContext from "./CosechaContext";
import { fundoAPI, sectorAPI, cosechaAPI } from "../../services/CosechaService";

// Estados iniciales
const INITIAL_FRUTOS_STATE = {
  pequeños: 0,
  medianos: 0,
  grandes: 0,
  sinFrutos: 0
};

const INITIAL_LOADING_STATE = {
  isLoading: false,
  error: null
};

// Custom hooks para manejo de estado
const useLoadingState = (initialData) => {
  const [state, setState] = useState({
    ...INITIAL_LOADING_STATE,
    ...initialData
  });

  const setLoading = () => setState(prev => ({ ...prev, isLoading: true, error: null }));
  const setError = (error) => setState(prev => ({ 
    ...prev, 
    isLoading: false, 
    error: error?.message || "Error desconocido"
  }));
  const setData = (data) => setState(prev => ({ 
    ...prev, 
    ...data, 
    isLoading: false, 
    error: null 
  }));

  return [state, { setLoading, setError, setData }];
};

const CosechaProvider = ({ children }) => {
  // Estados usando custom hook
  const [cosechaData, cosechaActions] = useLoadingState({
    fundo: null,
    frutos: { ...INITIAL_FRUTOS_STATE }
  });

  const [sectorData, sectorActions] = useLoadingState({});

  const [rankingData, rankingActions] = useLoadingState({
    grande: [],
    mediano: [],
    pequeño: [],
    noHayFruto: []
  });

  const [lastCosechaData, lastCosechaActions] = useLoadingState({
    data: []
  });

  // Transformadores de datos
  const transformFundoData = (data) => {
    if (!data?.length) throw new Error("No se encontraron datos");
    const fundo = data[0];
    return {
      fundo: fundo.codigo_fundo ? {
        codigo: fundo.codigo_fundo,
        nombre: fundo.nombre_fundo
      } : null,
      frutos: {
        pequeños: fundo.cantidad_pequeños,
        medianos: fundo.cantidad_medianos,
        grandes: fundo.cantidad_grandes,
        sinFrutos: fundo.cantidad_sin_frutos
      }
    };
  };

  const transformSectorData = (data, codigoSector) => {
    if (!data?.length) throw new Error("No se encontraron datos");
    const sector = data[0];
    return {
      [codigoSector]: {
        sector: {
          codigo: sector.codigo_sector,
          nombre: sector.nombre_sector
        },
        frutos: {
          pequeños: sector.cantidad_pequeños,
          medianos: sector.cantidad_medianos,
          grandes: sector.cantidad_grandes,
          sinFrutos: sector.cantidad_sin_frutos
        }
      }
    };
  };

  // Funciones fetch refactorizadas
  const fetchWithHandler = async (fetchFn, actions, transformFn = (data) => data) => {
    actions.setLoading();
    try {
      const data = await fetchFn();
      if (data === null) throw new Error("Error en la petición");
      actions.setData(transformFn(data));
    } catch (error) {
      actions.setError(error);
    }
  };

  // Funciones principales
  const fetchCosechaData = useCallback(async (codigoFundo) => {
    await fetchWithHandler(
      () => fundoAPI.getCantidad(codigoFundo),
      cosechaActions,
      transformFundoData
    );
  }, []);

  const fetchSectorData = useCallback(async (codigoFundo, codigoSector) => {
    await fetchWithHandler(
      () => sectorAPI.getCalculo(codigoFundo, codigoSector),
      sectorActions,
      (data) => transformSectorData(data, codigoSector)
    );
  }, []);

  const fetchAllRankings = useCallback(async (codigoFundo) => {
    rankingActions.setLoading();
    try {
      const [grande, mediano, pequeño, noHayFruto] = await Promise.all([
        cosechaAPI.getRanking('Grande', codigoFundo),
        cosechaAPI.getRanking('Mediano', codigoFundo),
        cosechaAPI.getRanking('Pequeño', codigoFundo),
        cosechaAPI.getRanking('No hay fruto', codigoFundo)
      ]);
      rankingActions.setData({ grande, mediano, pequeño, noHayFruto });
    } catch (error) {
      rankingActions.setError(error);
    }
  }, []);

  const fetchCosechaTotalData = useCallback(async () => {
    await fetchWithHandler(
      () => fundoAPI.getTotal(),
      cosechaActions,
      transformFundoData
    );
  }, []);

  const fetchSectorTotalData = useCallback(async (nombreSector) => {
    await fetchWithHandler(
      () => sectorAPI.getTotal(nombreSector),
      sectorActions,
      (data) => transformSectorData(data, nombreSector)
    );
  }, []);

  const fetchRankingGlobal = useCallback(async () => {
    rankingActions.setLoading();
    try {
      const [grande, mediano, pequeño, noHayFruto] = await Promise.all([
        cosechaAPI.getRankingGlobal('Grande'),
        cosechaAPI.getRankingGlobal('Mediano'),
        cosechaAPI.getRankingGlobal('Pequeño'),
        cosechaAPI.getRankingGlobal('No hay fruto')
      ]);
      rankingActions.setData({ grande, mediano, pequeño, noHayFruto });
    } catch (error) {
      rankingActions.setError(error);
    }
  }, []);

  const fetchLastCosechaData = useCallback(async (codigoFundo) => {
    await fetchWithHandler(
      () => cosechaAPI.getUltima(codigoFundo),
      lastCosechaActions,
      (data) => ({ data })
    );
  }, []);

  // Cálculos derivados
  const getTotalFrutos = useCallback(() => {
    const { pequeños, medianos, grandes, sinFrutos } = cosechaData.frutos;
    return pequeños + medianos + grandes + sinFrutos;
  }, [cosechaData.frutos]);

  const contextValue = useMemo(
    () => ({
      cosechaData,
      sectorData,
      rankingData,
      lastCosechaData,
      getTotalFrutos,
      fetchCosechaData,
      fetchSectorData,
      fetchAllRankings,
      fetchLastCosechaData,
      fetchCosechaTotalData,
      fetchSectorTotalData,
      fetchRankingGlobal,
    }),
    [cosechaData, sectorData, rankingData, lastCosechaData]
  );

  return (
    <CosechaContext.Provider value={contextValue}>
      {children}
    </CosechaContext.Provider>
  );
};

export default CosechaProvider;