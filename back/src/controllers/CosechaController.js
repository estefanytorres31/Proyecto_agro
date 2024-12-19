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
        res.status(200).json(fruto);
    }catch(error){
        console.error(error);
        res.status(500).json(error.message);
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

export const cantidadPorFundo=async(req,res)=>{
    const { codigo_fundo} = req.params;
    try{
        const cantidad=await CosechaService.cantidadPorFundo(codigo_fundo);
        res.status(200).json(cantidad);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener la cantidad de frutos por fundo"});
    }
}


export const calculoPorSector=async(req, res)=>{
    const { codigo_fundo, codigo_sector} = req.params;
    try{
        const calculo=await CosechaService.calculoPorSector(codigo_fundo, codigo_sector);
        res.status(200).json(calculo);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener el calculo por sector"});
    }
}

export const rankings = async (req, res) => {
    const { tam_fruto, cod_fundo } = req.params;
    if (!tam_fruto || !cod_fundo) {
        return res.status(400).json({
            message: 'Faltan parámetros en la solicitud. Se requieren tam_fruto y cod_fundo.',
        });
    }
    try {
        const rankings = await CosechaService.getRanking(cod_fundo,tam_fruto);
        console.log('Rankings:', rankings); 
        if (rankings.length > 0) {
            return res.status(200).json(rankings);
        } else {
            return res.status(404).json({
                message: 'No se encontraron rankings para el tamaño de fruto y fondo especificados.',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener los rankings',
            error: error.message
        });
    }
};

export const getLastCosecha = async (req, res) =>{
    const {codigo_fundo} = req.params;
    try{
        const cosecha = await CosechaService.getLastCosecha(codigo_fundo);
        if(!cosecha){
            return res.status(404).json({message: "No se encontró la cosecha más reciente por fundo"});
        };
        res.status(200).json(cosecha);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener la cosecha más reciente por fundo", error});
    }
}

export const get3LastCosecha=async(req, res) => {
    const {codigo_planta}=req.params;
    try{
        const cosechas = await CosechaService.get3LastCosecha(codigo_planta);
        res.status(200).json(cosechas);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener las 3 últimas cosechas", error});
    }
}