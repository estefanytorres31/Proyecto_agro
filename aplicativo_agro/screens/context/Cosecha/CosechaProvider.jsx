import React, { useState } from 'react';
import CosechaContext from './CosechaContext';
import { 
  getCosechaById, 
  createCosecha, 
  getAllCosechas, 
  updateTamañoFruto, 
  deleteCosecha,
  get3LastCosecha
} from '../../services/CosechaService';

const CosechaProvider = ({ children }) => {
  const [cosechas, setCosechas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCosechas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCosechas();
      if (data) {
        setCosechas(data);
        return data;
      }
    } catch (err) {
      setError('Error fetching cosechas');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addCosecha = async (cosecha_codigo_planta, tamaño_fruto) => {
    setLoading(true);
    setError(null);
    try {
      const newCosecha = await createCosecha(cosecha_codigo_planta, tamaño_fruto);
      if (newCosecha) {
        setCosechas(prev => [...prev, newCosecha]);
        return newCosecha;
      }
    } catch (err) {
      setError('Error creating cosecha');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCosechaFrutoSize = async (codigo_cosecha, tamaño_fruto) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCosecha = await updateTamañoFruto(codigo_cosecha, tamaño_fruto);
      if (updatedCosecha) {
        setCosechas(prev => 
          prev.map(cosecha => 
            cosecha.codigo_cosecha === codigo_cosecha ? updatedCosecha : cosecha
          )
        );
        return updatedCosecha;
      }
    } catch (err) {
      setError('Error updating cosecha');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeCosecha = async (codigo_cosecha) => {
    setLoading(true);
    setError(null);
    try {
      const isDeleted = await deleteCosecha(codigo_cosecha);
      if (isDeleted) {
        setCosechas(prev => 
          prev.filter(cosecha => cosecha.codigo_cosecha !== codigo_cosecha)
        );
        return true;
      }
    } catch (err) {
      setError('Error deleting cosecha');
      return false;
    } finally {
      setLoading(false);
    }
  };
  const getLastCosecha=async (codigo_planta)=>{
    setLoading(true);
    setError(null);
    try{
      const cosechas=await get3LastCosecha (codigo_planta);
      return cosechas;
    }catch(err){
      setError('Error fetching 3 last cosechas');
      return null;
    }finally{
      setLoading(false);
    }
  }

  const fetchCosechaById = async (codigo_cosecha) => {
    setLoading(true);
    setError(null);
    try {
      const cosecha = await getCosechaById(codigo_cosecha);
      return cosecha;
    } catch (err) {
      setError('Error fetching cosecha');
      return null;
    } finally {
      setLoading(false);
    }
  };


  const contextValue = {
    cosechas,
    loading,
    error,
    fetchCosechas,
    addCosecha,
    updateCosechaFrutoSize,
    removeCosecha,
    fetchCosechaById,
    setCosechas,
    getLastCosecha,
  };

  return (
    <CosechaContext.Provider value={contextValue}>
      {children}
    </CosechaContext.Provider>
  );
};

export default CosechaProvider;