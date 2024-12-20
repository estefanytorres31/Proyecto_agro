import * as FundoService from  "../services/FundoService.js";

export const getAllFundos= async (req, res) =>{
    try {
        const fundos = await FundoService.getAllFundos();
        res.status(200).json(fundos);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener los fundos"});
    }
};

export const getFundoById = async(req, res)=>{
    const { codigo_fundo } = req.params;
    try{
        const fundo = await FundoService.getFundoById(codigo_fundo);
        if(!fundo){
            return res.status(404).json({message: "Fundo no encontrado"});
        }
        res.status(200).json(fundo);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener el fundo"});
    }
}

export const createFundo = async(req, res)=>{
    const { codigo_fundo, nombre_fundo, hectarea } = req.body;
    try{
        const fundo = await FundoService.createFundo(codigo_fundo, nombre_fundo, hectarea);
        res.status(201).json(fundo);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al crear el fundo"});
    }
}

export const updateFundo = async(req, res)=>{
    const { codigo_fundo } = req.params;
    const { nombre_fundo, hectarea } = req.body;
    try{
        const fundo = await FundoService.updateFundo(codigo_fundo,nombre_fundo, hectarea);
        if(!fundo){
            return res.status(404).json({message: "Fundo no encontrado"});
        }
        res.status(200).json(fundo);
    }catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al actualizar el fundo"});
    }
}

