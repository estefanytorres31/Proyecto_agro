import { getAllCosechas, createCosecha, updateFrutoTamaño, deleteCosecha, getCosechaById, getCosechaByPlanta } from "../controllers/CosechaController.js";
import {Router} from "express"

const FrutoRouter = Router();

FrutoRouter.get('/api/cosecha', getAllCosechas);
FrutoRouter.get('/api/cosecha/:codigo_cosecha', getCosechaById);
FrutoRouter.post('/api/cosecha', createCosecha);
FrutoRouter.put('/api/cosecha/:codigo_cosecha/size', updateFrutoTamaño);
FrutoRouter.delete('/api/cosecha/:codigo_cosecha', deleteCosecha);
FrutoRouter.get('/api/cosecha/planta/:cosecha_codigo_planta', getCosechaByPlanta);

export default FrutoRouter;