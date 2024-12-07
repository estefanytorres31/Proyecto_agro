import apiClient from "../API/AxiosConfig"

export const getAllMantenimientos= async()=>{
    try{
        const {data, status}=await apiClient.get('/api/mantenimiento')
        return {
            data,
            status
        }
    }catch(error){
        console.log(error)
    }
}

export const getMantenimientoById= async(codigo_mantenimiento)=>{
    try{
        const {data, status}=await apiClient.get(`/api/mantenimiento/${codigo_mantenimiento}`)
        return {
            data,
            status
        }
    }catch(error){
        console.log(error)
    }
}

export const createMantenimiento= async(mantenimiento_codigo_planta, mantenimiento)=>{
    try{
        const response=await apiClient.post('/api/mantenimiento', {mantenimiento_codigo_planta, mantenimiento})
        return response.data;
    }catch(error){
        console.log(error)
        return null;
    }
}

export const updateMantenimiento= async(codigo_mantenimiento, mantenimiento, mantenimiento_codigo_planta)=>{
    try{
        const {data, status}=await apiClient.put(`/api/mantenimiento/${codigo_mantenimiento}`, {mantenimiento, mantenimiento_codigo_planta})
        return {
            data,
            status
        }
    }catch(error){
        console.log(error)
    }
}

export const deleteMantenimiento= async(codigo_mantenimiento)=>{
    try{
        const {data, status}=await apiClient.delete(`/api/mantenimiento/${codigo_mantenimiento}`)
        return {
            data,
            status
        }
    }catch(error){
        console.log(error)
    }
}