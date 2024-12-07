import apiClient from "../API/AxiosConfig";

export const getCosechaById = async (codigo_cosecha)=>{
    try{
        const response=await apiClient.get(
            `/api/cosecha/${codigo_cosecha}`
        )
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
};

export const createCosecha = async (cosecha_codigo_planta, tamaño_fruto) => {
    try{
        const response=await apiClient.post(
            `/api/cosecha`,
            {cosecha_codigo_planta, tamaño_fruto}
        )
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const getAllCosechas = async ()=>{
    try{
        const response=await apiClient.get(
            `/api/cosecha`
        )
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const updateTamañoFruto = async (codigo_cosecha, tamaño_fruto) => {
    try{
        const response=await apiClient.put(
            `/api/cosecha/${codigo_cosecha}`,
            {tamaño_fruto}
        )
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const deleteCosecha = async (codigo_cosecha) => {
    try{
        await apiClient.delete(`/api/cosecha/${codigo_cosecha}`)
        return true
    }catch(error){
        console.error(error);
        return false;
    }
}