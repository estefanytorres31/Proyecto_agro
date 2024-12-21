import { getAllFundos, createFundo, getFundoById, updateFundo, cantidadPorFundo, totalFrutos } from "../controllers/FundoController.js";
import {Router} from "express";

const fundoRouter = Router();

fundoRouter.get('/api/fundo', getAllFundos);
fundoRouter.get('/api/fundo/:codigo_fundo', getFundoById);
fundoRouter.post('/api/fundo', createFundo);
fundoRouter.put('/api/fundo/:codigo_fundo', updateFundo);
fundoRouter.get('/api/fundo/cantidad/:codigo_fundo', cantidadPorFundo)
fundoRouter.post('/api/fundo/total', totalFrutos);

export default fundoRouter;