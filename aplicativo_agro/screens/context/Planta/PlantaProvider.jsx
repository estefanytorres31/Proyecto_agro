import React, { useState } from 'react';
import PlantaContext from './PlantaContext';
import { 
  createPlanta, 
  getPlantas, 
  deletePlanta, 
  getPlantaById 
} from '../../services/PlantaService';

const PlantaProvider = ({ children }) => {
  // State for managing plantas
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlanta, setSelectedPlanta] = useState(null);

  // Function to fetch all plantas
  const fetchPlantas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPlantas();
      if (data) {
        setPlantas(data);
        return data;
      }
    } catch (err) {
      setError('Error fetching plantas');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new planta
  const addPlanta = async (newPlanta) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPlanta(newPlanta);
      if (response.data) {
        // Update local state with the new planta
        setPlantas(prev => [...prev, response.data]);
        return response;
      }
    } catch (err) {
      setError('Error creating planta');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a planta
  const removePlanta = async (codigo_planta) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deletePlanta(codigo_planta);
      if (response.data) {
        // Remove planta from local state
        setPlantas(prev => 
          prev.filter(planta => planta.codigo_planta !== codigo_planta)
        );
        return response;
      }
    } catch (err) {
      setError('Error deleting planta');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a specific planta by ID
  const fetchPlantaById = async (codigo_planta) => {
    setLoading(true);
    setError(null);
    try {
      const planta = await getPlantaById(codigo_planta);
      if (planta) {
        setSelectedPlanta(planta);
        return planta;
      }
    } catch (err) {
      setError(`Error fetching planta with ID ${codigo_planta}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to clear selected planta
  const clearSelectedPlanta = () => {
    setSelectedPlanta(null);
  };

  // Prepare the context value
  const contextValue = {
    plantas,
    loading,
    error,
    selectedPlanta,
    fetchPlantas,
    addPlanta,
    removePlanta,
    fetchPlantaById,
    clearSelectedPlanta,
    setPlantas,
    setSelectedPlanta
  };

  return (
    <PlantaContext.Provider value={contextValue}>
      {children}
    </PlantaContext.Provider>
  );
};

export default PlantaProvider;