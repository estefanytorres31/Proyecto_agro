import { getSumaFrutosSector, calculoPorSector } from "../controllers/SectorController.js";
import {Router} from "express"

const sectorRouter = Router();

sectorRouter.get ('/api/sector/total/:nombre_sector', getSumaFrutosSector);
sectorRouter.get('/api/sector/calculo/:codigo_fundo/:codigo_sector', calculoPorSector);

export default sectorRouter;