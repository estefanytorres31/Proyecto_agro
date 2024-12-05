import { getAllMantenimientos, getMantenimientoById, createMantenimiento, updateMantenimiento, deleteMantenimiento } from "../controllers/MantenimientoController.js";
import { Router } from "express";

const MantenimientoRouter = Router();

MantenimientoRouter.get('/api/mantenimiento', getAllMantenimientos);
MantenimientoRouter.get('/api/mantenimiento/:codigo_mantenimiento', getMantenimientoById);
MantenimientoRouter.post('/api/mantenimiento', createMantenimiento);
MantenimientoRouter.put('/api/mantenimiento/:codigo_mantenimiento', updateMantenimiento);
MantenimientoRouter.delete('/api/mantenimiento/:codigo_mantenimiento', deleteMantenimiento);

export default MantenimientoRouter;