import apiClient from "../API/AxiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createPlanta=async (newPlanta)=>{
    try{
        const {data, status}=await apiClient.post(
        '/api/planta',
        newPlanta
    )
    return {
        data,
        status
    }
}catch(error){
    console.error(error);
    return {
        error: error.message
    }
}
};

export const getPlantas=async ()=>{
    try{
        const response=await apiClient.get(
            '/api/planta'
        )
        return response.data
    }catch(error){
        console.error(error);
        return [];
    }
}

export const updatePlantaTamano = async (codigo_planta, updatedPlanta) => {
    try {
        const { data } = await apiClient.put(`/api/planta/qr/${codigo_planta}`, updatedPlanta);
        return data; 
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};


export const deletePlanta=async (codigo_planta)=>{
    try{
        const {data, status}=await apiClient.delete(
            `/api/planta/${codigo_planta}`
        )
        return {
            data,
            status
        }
    }catch(error){
        console.error(error);
        return {
            error: error.message
        }
    }
};

export const getPlantaById=async (codigo_planta)=>{
    try{
        const response=await apiClient.get(
            `/api/planta/qr/${codigo_planta}`
        )
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}