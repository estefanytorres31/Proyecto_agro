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

export const createMantenimiento= async(mantenimiento, mantenimiento_codigo_planta)=>{
    try{
        const {data, status}=await apiClient.post('/api/mantenimiento', {mantenimiento, mantenimiento_codigo_planta})
        return {
            data,
            status
        }
    }catch(error){
        console.log(error)
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