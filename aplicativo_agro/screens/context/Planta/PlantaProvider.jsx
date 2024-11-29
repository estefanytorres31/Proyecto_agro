import React, {useEffect,useState,useContext} from "react";
import { createPlanta, getPlantaById,getPlantas, updatePlantaTamano, deletePlanta } from "../../services/PlantaService";
import PlantaContext from "./PlantaContext";

const PlantaProvider =({children})=>{
    const [plantas, setPlantas] = useState([]);
    const [planta, setPlanta] = useState(null);

    const handleCreatePlanta =async(newPlanta)=>{
        try{
            const res=await createPlanta(newPlanta);
            if(res.status===200||res.status===201){
                return res.data;
            }else{
                return null;
            }
        }catch(error){
            console.error(error);
            return null;
        }
    }

    const fetchPlantas=async()=>{
        try{
            const planta=await getPlantas();
            console.log(planta);
            setPlanta(planta);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchPlantas();
    })

    const handleEditPlanta = async (qrData, updatePlanta) => {
        try {
            const updatedPlanta = await updatePlantaTamano(qrData, updatePlanta);
            const updatedPlantas = plantas.map((planta) =>
                planta.qrData === qrData ? updatedPlanta : planta
            );
            setPlantas(updatedPlantas);
            return updatedPlanta;
        } catch (error) {
            console.error(error);
            return null; 
        }
    };
    
    return(
        <PlantaContext.Provider value={{
            plantas,
            planta,
            handleCreatePlanta,
            fetchPlantas,
            handleEditPlanta,
            deletePlanta
        }}>
            {children}
        </PlantaContext.Provider>
    )
}
export default PlantaProvider;