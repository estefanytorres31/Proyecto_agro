import * as CosechaService from "../services/CosechaService.js";

export const getAllCosechas = async (req, res) => {
    try {
        const {tamaño_fruto, fecha_registro, orderBy, orderDirection }=req.query

        const queryParams={};
        if(tamaño_fruto) queryParams.tamaño_fruto=tamaño_fruto;
        if(fecha_registro) queryParams.fecha_registro=fecha_registro;
        if(orderBy) queryParams.orderBy=orderBy;
        if(orderDirection) queryParams.orderDirection=orderDirection;

        const frutos = await CosechaService.getAllCosechas(queryParams);
        res.status(200).json(frutos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los frutos" });
    }
}

export const createCosecha= async (req, res) => {
    const {tamaño_fruto, cosecha_codigo_planta} = req.body;
    try{
        const fruto = await CosechaService.createCosecha(tamaño_fruto, cosecha_codigo_planta);
        res.status(201).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al crear el fruto"});
    }
}

export const updateFrutoTamaño = async (req, res) => {
    const { codigo_cosecha} = req.params;
    const {tamaño_fruto} = req.body;
    try{
        const fruto = await CosechaService.updateFrutoTamaño(codigo_cosecha,tamaño_fruto);
        if(!fruto){
            return res.status(404).json({message: "Fruto no encontrado"});
        }
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al actualizar el tamaño del fruto"});
    }
}

export const deleteCosecha = async (req, res) => {
    const { codigo_cosecha} = req.params;
    try{
        await CosechaService.deleteCosecha(codigo_cosecha);
        res.status(200).json({message: "Fruto eliminado"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al eliminar el fruto"});
    }
}

export const getCosechaById = async (req, res) => {
    const { codigo_cosecha} = req.params;
    try{
        const fruto = await CosechaService.getCosechaById(codigo_cosecha);
        if(!fruto){
            return res.status(404).json({message: "Fruto no encontrado"});
        }
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener el fruto"});
    }
}

export const getCosechaByPlanta = async (req, res) => {
    const { fruto_codigo_planta} = req.params;
    try{
        const fruto = await CosechaService.getCosechaByPlanta(fruto_codigo_planta);
        if(!fruto){
            return res.status(404).json({message: "Fruto no encontrado"});
        }
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener el fruto por plantar"});
    }
}

export const rankingFrutosGrandes = async (req, res) => {
    try {
        const ranking = await CosechaService.rankingfrutosgrandes();
        return res.status(200).json({
            success: true,
            message: 'Ranking de frutos grandes obtenido exitosamente',
            data: ranking
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el ranking de frutos grandes',
            error: error.message
            
        });
    }
};
