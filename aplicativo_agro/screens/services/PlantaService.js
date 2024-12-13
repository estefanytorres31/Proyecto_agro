import apiClient from "../API/AxiosConfig";

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

