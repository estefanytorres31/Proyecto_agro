import React, { useState } from 'react';
import CosechaContext from './CosechaContext';
import { 
  getCosechaById, 
  createCosecha, 
  getAllCosechas, 
  updateTamañoFruto, 
  deleteCosecha 
} from '../../services/CosechaService';

const CosechaProvider = ({ children }) => {
  // State for managing cosechas (harvests)
  const [cosechas, setCosechas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all cosechas
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

  // Function to add a new cosecha
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

  // Function to update fruit size
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

  // Function to remove a cosecha
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

  // Function to get a specific cosecha by ID
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
    setCosechas
  };

  return (
    <CosechaContext.Provider value={contextValue}>
      {children}
    </CosechaContext.Provider>
  );
};

export default CosechaProvider;