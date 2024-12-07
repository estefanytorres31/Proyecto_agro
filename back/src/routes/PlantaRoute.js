import { getAllPlantas, createMultiplePlantas, deletePlanta, getPlantaById, updatePlanta} from "../controllers/PlantaController.js";
import { Router } from "express";

const Plantarouter = Router();

Plantarouter.get('/api/planta',getAllPlantas);
Plantarouter.post('/api/planta', createMultiplePlantas);
Plantarouter.delete('/api/planta/:codigo_planta', deletePlanta);
Plantarouter.get("/api/planta/qr/:codigo_planta", getPlantaById);
Plantarouter.put("/api/planta/qr/:codigo_planta", updatePlanta); 
 

export default Plantarouter;
