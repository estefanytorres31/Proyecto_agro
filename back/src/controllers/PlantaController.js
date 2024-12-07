import * as PlantaService from "../services/PlantaService.js";

export const getAllPlantas = async(req, res)=>{
    try {
        const plantas = await PlantaService.getAllPlantas();
        res.status(200).json(plantas);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener las plantas"});
    }
}

export const createMultiplePlantas=async(req, res)=>{
    const {cantidad, sectorCodigo}= req.body;
    try{
        const plantas = await PlantaService.createMultiplePlantas(cantidad, sectorCodigo);
        res.status(201).json(plantas);
        
    } catch(error){
        console.error(error);
        res.status(500).json({message: "Error al crear las plantas"});
    }
}


export const deletePlanta = async(req, res)=>{
    const { codigo_planta } = req.params;
    try{
        await PlantaService.deletePlanta(codigo_planta);
        res.status(200).json({message: "Planta eliminada"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al eliminar la planta"});
    }
}

export const getPlantaById=async(req, res)=>{
    const { codigo_planta } = req.params;
    try{
        const planta = await PlantaService.getPlantaById(codigo_planta);
        if(!planta){
            return res.status(404).json({message: "Planta no encontrada"});
        }
        res.status(200).json(planta);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener la planta"});
    }
}

export const updatePlanta=async(req, res)=>{
    const { codigo_planta } = req.params;
    const { planta_codigo_sector } = req.body; 
    try{
        const planta=await PlantaService.updatePlanta(codigo_planta, planta_codigo_sector);
        res.status(200).json(planta);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al actualizar la planta", error: error.message});
    }
}

