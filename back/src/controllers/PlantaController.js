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

export const updatePlantaTamaño = async(req, res)=>{
    const {codigo_planta} = req.params;
    const { tamaño } = req.body;
    try{
        await PlantaService.updatePlantaTamano(codigo_planta,tamaño);
        res.status(200).json({message: "Tamaño de la planta actualizado"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al actualizar el tamaño de la planta"});
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

export const getAndUpdatePlanta = async (req, res) => {
    const { codigo_planta } = req.params;
    const { tamaño } = req.body; 
    
    try {
        const planta = await PlantaService.getPlantaById(codigo_planta);
        if (!planta) {
            return res.status(404).json({ message: "Planta no encontrada" });
        }

        if (tamaño) {
            await PlantaService.updatePlantaTamano(codigo_planta, tamaño);
            return res.status(200).json({ 
                message: "Tamaño de la planta actualizado", 
                planta: { ...planta, tamaño }
            });
        }

        res.status(200).json(planta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar la solicitud" });
    }
};


