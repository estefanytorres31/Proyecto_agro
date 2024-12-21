import * as SectorService from "../services/SectorService.js";

export const getSumaFrutosSector=async(req,  res)=>{
    const {nombre_sector} = req.params;
    try {
        const sumaFrutos = await SectorService.getSumaFrutosSector(nombre_sector);
        res.status(200).json(sumaFrutos);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener la suma de frutos por sector", error: error.message});
    }
}

export const calculoPorSector=async(req, res)=>{
    const { codigo_fundo, codigo_sector} = req.params;
    try{
        const calculo=await SectorService.calculoPorSector(codigo_fundo, codigo_sector);
        res.status(200).json(calculo);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener el calculo por sector"});
    }
}