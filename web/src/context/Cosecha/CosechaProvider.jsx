// CosechaProvider.js
import { useState, useCallback, useMemo } from "react";
import CosechaContext from "./CosechaContext";
import { cantidadPorFundo } from "../../services/CosechaService";

const CosechaProvider = ({ children }) => {
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

  const fetchCosechaData = useCallback(async (codigoCosecha) => {
    setCosechaData((prev) => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    try {
      const data = await cantidadPorFundo(codigoCosecha);
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

  const contextValue = useMemo(
    () => ({
      cosechaData,
      fetchCosechaData,
      getTotalFrutos: () =>
        cosechaData.frutos.pequeños +
        cosechaData.frutos.medianos +
        cosechaData.frutos.grandes +
        cosechaData.frutos.sinFrutos
    }),
    [cosechaData]
  );

  return (
    <CosechaContext.Provider value={contextValue}>
      {children}
    </CosechaContext.Provider>
  );
};

export default CosechaProvider;
