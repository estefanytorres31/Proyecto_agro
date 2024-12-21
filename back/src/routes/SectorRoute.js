import { getSumaFrutosSector } from "../controllers/SectorController.js";
import {Router} from "express"

const sectorRouter = Router();

sectorRouter.get ('/api/sector/total/:nombre_sector', getSumaFrutosSector);


export default sectorRouter;