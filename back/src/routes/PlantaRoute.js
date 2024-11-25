import { getAllPlantas, getPlantaById, createPlanta, createMultiplePlantas, updatePlantaTamaño, deletePlanta} from "../controllers/PlantaController";
import { Router } from "express";

const Plantarouter = Router();

Plantarouter.get('/api/planta',getAllPlantas);
Plantarouter.get('/api/planta/:codigo_planta', getPlantaById);
//Plantarouter.post('/api/planta', createPlanta);
Plantarouter.post('/api/planta', createMultiplePlantas);
Plantarouter.put('/api/planta/:codigo_planta/size', updatePlantaTamaño);
Plantarouter.delete('/api/planta/:codigo_planta', deletePlanta);

export default Plantarouter;
