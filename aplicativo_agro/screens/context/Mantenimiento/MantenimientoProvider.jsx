import React, { useState } from 'react';
import MantenimientoContext from './MantenimientoContext';
import { 
  getAllMantenimientos, 
  getMantenimientoById, 
  createMantenimiento, 
  updateMantenimiento, 
  deleteMantenimiento,
  get3LastMante
} from '../../services/MantenimientoService';

const MantenimientoProvider = ({ children }) => {
  // State for managing mantenimientos
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all mantenimientos
  const fetchMantenimientos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMantenimientos();
      if (response && response.data) {
        setMantenimientos(response.data);
        return response;
      }
    } catch (err) {
      setError('Error fetching mantenimientos');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a specific mantenimiento by ID
  const fetchMantenimientoById = async (codigo_mantenimiento) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMantenimientoById(codigo_mantenimiento);
      return response;
    } catch (err) {
      setError(`Error fetching mantenimiento with ID ${codigo_mantenimiento}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new mantenimiento
  const addMantenimiento = async (mantenimiento_codigo_planta, mantenimiento) => {
    setLoading(true);
    setError(null);
    try {
      const newMantenimiento = await createMantenimiento(mantenimiento_codigo_planta, mantenimiento);
      if (newMantenimiento) {
        setMantenimientos(prev => [...prev, newMantenimiento]);
        return newMantenimiento;
      }
    } catch (err) {
      setError('Error creating mantenimiento');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to update a mantenimiento
  const modifyMantenimiento = async (codigo_mantenimiento, mantenimiento, mantenimiento_codigo_planta) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateMantenimiento(codigo_mantenimiento, mantenimiento, mantenimiento_codigo_planta);
      if (response && response.data) {
        setMantenimientos(prev => 
          prev.map(item => 
            item.codigo_mantenimiento === codigo_mantenimiento ? response.data : item
          )
        );
        return response;
      }
    } catch (err) {
      setError('Error updating mantenimiento');
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a mantenimiento
  const removeMantenimiento = async (codigo_mantenimiento) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteMantenimiento(codigo_mantenimiento);
      if (response) {
        setMantenimientos(prev => 
          prev.filter(item => item.codigo_mantenimiento !== codigo_mantenimiento)
        );
        return response;
      }
    } catch (err) {
      setError('Error deleting mantenimiento');
    } finally {
      setLoading(false);
    }
  };

  const obtener3registros=async(codigo_planta)=>{
    setLoading(true);
    setError(null);
    try {
      const response = await get3LastMante(codigo_planta);
      return response;
    } catch (err) {
      setError('Error fetching 3 last mantenimientos');
    } finally {
      setLoading(false);
    }
  }

  // Prepare the context value
  const contextValue = {
    mantenimientos,
    loading,
    error,
    fetchMantenimientos,
    fetchMantenimientoById,
    addMantenimiento,
    modifyMantenimiento,
    removeMantenimiento,
    setMantenimientos,
    obtener3registros,
  };

  return (
    <MantenimientoContext.Provider value={contextValue}>
      {children}
    </MantenimientoContext.Provider>
  );
};

export default MantenimientoProvider;