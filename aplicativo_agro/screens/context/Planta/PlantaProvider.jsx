import React, { useEffect, useState } from "react";
import { createPlanta, getPlantas, updatePlantaTamano, deletePlanta } from "../../services/PlantaService";
import PlantaContext from "./PlantaContext";

const PlantaProvider = ({ children }) => {
    const [plantas, setPlantas] = useState([]);
    const [planta, setPlanta] = useState(null);

    const handleCreatePlanta = async (newPlanta) => {
        try {
            const res = await createPlanta(newPlanta);
            if (res.status === 200 || res.status === 201) {
                setPlantas((prevPlantas) => [...prevPlantas, res.data]);
                return res.data;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const fetchPlantas = async () => {
        try {
            const plantas = await getPlantas();
            setPlantas(plantas);  
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPlantas();
    }, []);  

    const handleEditPlanta = async (qrData, updatedPlanta) => {
        try {
            const updatedPlantaData = await updatePlantaTamano(qrData, updatedPlanta);
            setPlantas((prevPlantas) =>
                prevPlantas.map((planta) =>
                    planta.qrData === qrData ? updatedPlantaData : planta
                )
            );
            return updatedPlantaData;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleDeletePlanta = async (codigo_planta) => {
        try {
            const res = await deletePlanta(codigo_planta);
            if (res.status === 200 || res.status === 204) {
                setPlantas((prevPlantas) => prevPlantas.filter((planta) => planta.qrData !== codigo_planta));
                return res.data;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return (
        <PlantaContext.Provider value={{
            plantas,
            planta,
            handleCreatePlanta,
            fetchPlantas,
            handleEditPlanta,
            handleDeletePlanta
        }}>
            {children}
        </PlantaContext.Provider>
    );
}

export default PlantaProvider;