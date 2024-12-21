import apiClient from "../API/apiClient";

export const cantidadPorFundo=async(codigo_fundo)=>{
    try{
        const response=await apiClient.get(`/api/fundo/cantidad/${codigo_fundo}`)
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
 
}

export const calculoPorSector = async(codigo_fundo, codigo_sector)=>{
    try{
        const response=await apiClient.get(`/api/sector/calculo/${codigo_fundo}/${codigo_sector}`)
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const rankings = async (tam_fruto, cod_fundo) => {
    try {
        const response = await apiClient.get(`/api/cosecha/ranking/${cod_fundo}/${tam_fruto}`);
        console.log("Respuesta de API Rankings:", response.data); // Verifica aquí
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getLastCosecha= async (codigo_fundo)=>{
    try{
        const response=await apiClient.get(`/api/cosecha/ultima/${codigo_fundo}`)
        console.log(response.data);
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const RankingGlobal=async(tam_fruto)=>{
    try{
        const response=await apiClient.get(`/api/ranking/global/${tam_fruto}`)
        console.log(response.data);
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const TotalFrutosSector=async(nombre_sector)=>{
    try{
        const response=await apiClient.get(`/api/sector/total/${nombre_sector}`)
        console.log(response.data);
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}

export const TotalFrutos=async()=>{
    try{
        const response=await apiClient.post(`/api/fundo/total`)
        console.log(response.data);
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
}