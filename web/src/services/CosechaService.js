import apiClient from "../API/apiClient";

export const cantidadPorFundo=async(codigo_cosecha)=>{
    try{
        const response=await apiClient.get(`/api/cosecha/fundo/cantidad/${codigo_cosecha}`)
        return response.data
    }catch(error){
        console.error(error);
        return null;
    }
 
}