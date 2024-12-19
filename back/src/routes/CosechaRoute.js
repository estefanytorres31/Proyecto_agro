import { cantidadPorFundo, 
    getAllCosechas, 
    createCosecha, 
    updateFrutoTamaño, 
    deleteCosecha, 
    getCosechaById, 
    getCosechaByPlanta, 
    rankings,
    getLastCosecha,
    get3LastCosecha,
    calculoPorSector } from "../controllers/CosechaController.js";
import { Router } from "express"

const FrutoRouter = Router();

FrutoRouter.get('/api/cosecha', getAllCosechas);
FrutoRouter.get('/api/cosecha/:codigo_cosecha', getCosechaById);
FrutoRouter.post('/api/cosecha', createCosecha);
FrutoRouter.put('/api/cosecha/:codigo_cosecha/size', updateFrutoTamaño);
FrutoRouter.delete('/api/cosecha/:codigo_cosecha', deleteCosecha);
FrutoRouter.get('/api/cosecha/planta/:cosecha_codigo_planta', getCosechaByPlanta);
FrutoRouter.get('/api/cosecha/fundo/cantidad/:codigo_fundo', cantidadPorFundo)
FrutoRouter.get('/api/cosecha/calculo/:codigo_fundo/:codigo_sector', calculoPorSector)
FrutoRouter.get('/api/cosecha/ranking/:cod_fundo/:tam_fruto',rankings)
FrutoRouter.get('/api/cosecha/ultima/:codigo_fundo', getLastCosecha)
FrutoRouter.get('/api/cosecha/registros/:codigo_planta',get3LastCosecha)


export default FrutoRouter;