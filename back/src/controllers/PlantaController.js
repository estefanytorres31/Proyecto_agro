import * as PlantaService from "../services/PlantaService";

export const getAllPlantas = async(req, res)=>{

    try {
        const plantas = await PlantaService.getAllPlantas();
        res.status(200).json(plantas);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener las plantas"});
    }
}

export const getPlantaById = async(req, res)=>{
    const { codigo_planta } = req.params;
    try{
        const planta = await PlantaService.getPlantaById(codigo_planta);
        if(!planta){
            return res.status(404).json({message: "Planta no encontrada"});
        }
        res.status(200).json(planta);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener la planta"});
    }
}

export const createPlanta = async(req, res)=>{
    const {codigo_planta, planta_codigo_sector} = req.body;
    try{
        const planta = await PlantaService.createPlanta(codigo_planta, planta_codigo_sector);
        res.status(201).json(planta);
        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al crear la planta"});
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

export const updatePlanta = async(req, res)=>{
    
}