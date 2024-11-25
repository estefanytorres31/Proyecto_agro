import { getAllPlantas, getPlantaById, createPlanta, createMultiplePlantas} from "../controllers/PlantaController";
import { Router } from "express";

const Plantarouter = Router();

Plantarouter.get('/api/planta',getAllPlantas);
Plantarouter.get('/api/planta/:codigo_planta', getPlantaById);
//Plantarouter.post('/api/planta', createPlanta);
Plantarouter.post('/api/planta', createMultiplePlantas);

export default Plantarouter;
