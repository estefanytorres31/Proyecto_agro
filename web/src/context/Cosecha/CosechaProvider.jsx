/* eslint-disable react/prop-types */
import { useState, useCallback, useMemo } from "react";
import CosechaContext from "./CosechaContext";
import { cantidadPorFundo, calculoPorSector, rankings } from "../../services/CosechaService";

const CosechaProvider = ({ children }) => {
  // Estado para datos generales de cosecha
  const [cosechaData, setCosechaData] = useState({
    fundo: null,
    frutos: {
      pequeños: 0,
      medianos: 0,
      grandes: 0,
      sinFrutos: 0
    },
    isLoading: false,
    error: null
  });

  // Estado para datos por sector
  const [sectorData, setSectorData] = useState({
    sector: null,
    frutos: {
      pequeños: 0,
      medianos: 0,
      grandes: 0,
      sinFrutos: 0
    },
    isLoading: false,
    error: null
  });

  // Estado para rankings
  const [rankingData, setRankingData] = useState({
    plantas: [],
    isLoading: false,
    error: null
  });

  // Función para cargar datos generales de cosecha
  const fetchCosechaData = useCallback(async (codigoFundo) => {
    setCosechaData((prev) => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const data = await cantidadPorFundo(codigoFundo);
      if (data && data.length > 0) {
        const fundo = data[0];
        setCosechaData({
          fundo: {
            codigo: fundo.codigo_fundo,
            nombre: fundo.nombre_fundo
          },
          frutos: {
            pequeños: fundo.cantidad_pequeños,
            medianos: fundo.cantidad_medianos,
            grandes: fundo.cantidad_grandes,
            sinFrutos: fundo.cantidad_sin_frutos
          },
          isLoading: false,
          error: null
        });
      } else {
        throw new Error("No se encontraron datos");
      }
    } catch (error) {
      setCosechaData((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error desconocido"
      }));
    }
  }, []);

  // Función para cargar datos por sector
  const fetchSectorData = useCallback(async (codigoFundo, codigoSector) => {
    setSectorData((prev) => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const data = await calculoPorSector(codigoFundo, codigoSector);
      if (data && data.length > 0) {
        const sector = data[0];
        setSectorData({
          sector: {
            codigo: sector.codigo_sector,
            nombre: sector.nombre_sector
          },
          frutos: {
            pequeños: sector.cantidad_pequeños,
            medianos: sector.cantidad_medianos,
            grandes: sector.cantidad_grandes,
            sinFrutos: sector.cantidad_sin_frutos
          },
          isLoading: false,
          error: null
        });
        console.log(sector.data)
      } else {
        throw new Error("No se encontraron datos");
      }
    } catch (error) {
      setSectorData((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error desconocido"
      }));
    }
  }, []);

  // Función para cargar rankings
  const fetchRankingData = useCallback(async (tamañoFruto, codigoFundo) => {
    setRankingData((prev) => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const data = await rankings(tamañoFruto, codigoFundo);
      if (data && data.length > 0) {
        setRankingData({
          plantas: data,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error("No se encontraron datos");
      }
    } catch (error) {
      setRankingData((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Error desconocido"
      }));
    }
  }, []);

  // Valor del contexto
  const contextValue = useMemo(
    () => ({
      cosechaData,
      fetchCosechaData,
      getTotalFrutos: () =>
        cosechaData.frutos.pequeños +
        cosechaData.frutos.medianos +
        cosechaData.frutos.grandes +
        cosechaData.frutos.sinFrutos,
      sectorData,
      fetchSectorData,
      rankingData,
      fetchRankingData
    }),
    [cosechaData, sectorData, rankingData]
  );

  return (
    <CosechaContext.Provider value={contextValue}>
      {children}
    </CosechaContext.Provider>
  );
};

export default CosechaProvider;
