import { getAllPlantas, createPlanta, createMultiplePlantas, deletePlanta,  getAndUpdatePlanta} from "../controllers/PlantaController";
import { Router } from "express";

const Plantarouter = Router();

Plantarouter.get('/api/planta',getAllPlantas);
Plantarouter.post('/api/planta', createMultiplePlantas);
Plantarouter.delete('/api/planta/:codigo_planta', deletePlanta);
Plantarouter.get("/api/planta/qr/:codigo_planta", getAndUpdatePlanta);
Plantarouter.put("/api/planta/qr/:codigo_planta", getAndUpdatePlanta); 

export default Plantarouter;
