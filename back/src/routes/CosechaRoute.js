import { getAllFrutos, createFruto, updateFrutoTamaño, deleteFruto, getFrutoById, getFrutoByPlanta } from "../controllers/CosechaController";
import {Router} from "express"

const FrutoRouter = Router();

FrutoRouter.get('/api/fruto', getAllFrutos);
FrutoRouter.get('/api/fruto/:codigo_fruto', getFrutoById);
FrutoRouter.post('/api/fruto', createFruto);
FrutoRouter.put('/api/fruto/:codigo_fruto/size', updateFrutoTamaño);
FrutoRouter.delete('/api/fruto/:codigo_fruto', deleteFruto);
FrutoRouter.get('/api/fruto/planta/:fruto_codigo_planta', getFrutoByPlanta);

export default FrutoRouter;