import * as FrutoService from "../services/FrutoService";

export const getAllFrutos = async (req, res) => {
    try {
        const frutos = await FrutoService.getAllFrutos();
        res.status(200).json(frutos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los frutos" });
    }
}

export const createFruto= async (req, res) => {
    const {tamaño_fruto, fruto_codigo_plantar} = req.body;
    try{
        const fruto = await FrutoService.createFruto(tamaño_fruto, fruto_codigo_plantar);
        res.status(201).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al crear el fruto"});
    }
}

export const updateFrutoTamaño = async (req, res) => {
    const { codigo_fruto} = req.params;
    const {tamaño_fruto} = req.body;
    try{
        const fruto = await FrutoService.updateFrutoTamaño(codigo_fruto,tamaño_fruto);
        if(!fruto){
            return res.status(404).json({message: "Fruto no encontrado"});
        }
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al actualizar el tamaño del fruto"});
    }
}

export const deleteFruto = async (req, res) => {
    const { codigo_fruto} = req.params;
    try{
        await FrutoService.deleteFruto(codigo_fruto);
        res.status(200).json({message: "Fruto eliminado"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al eliminar el fruto"});
    }
}

export const getFrutoById = async (req, res) => {
    const { codigo_fruto} = req.params;
    try{
        const fruto = await FrutoService.getFrutoById(codigo_fruto);
        if(!fruto){
            return res.status(404).json({message: "Fruto no encontrado"});
        }
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener el fruto"});
    }
}

export const getFrutoByPlanta = async (req, res) => {
    const { fruto_codigo_planta} = req.params;
    try{
        const fruto = await FrutoService.getFrutoByPlantar(fruto_codigo_planta);
        if(!fruto){
            return res.status(404).json({message: "Fruto no encontrado"});
        }
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener el fruto por plantar"});
    }
}