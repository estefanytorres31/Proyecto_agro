import { getAllFundos, createFundo, getFundoById, updateFundo } from "../controllers/FundoController";
import {Router} from "express";

const fundoRouter = Router();

fundoRouter.get('/api/fundo', getAllFundos);
fundoRouter.get('/api/fundo/:codigo_fundo', getFundoById);
fundoRouter.post('/api/fundo', createFundo);
fundoRouter.put('/api/fundo/:codigo_fundo', updateFundo);

export default fundoRouter;