import express from "express";
import morgan from "morgan";
import cors from "cors";

import Plantarouter from './routes/PlantaRoute.js';
import CosechaRouter from './routes/CosechaRoute.js';
import FundoRouter from './routes/FundoRoute.js';
import MantenimientoRouter from './routes/MantenimientoRouter.js';
import sectorRouter from "./routes/SectorRoute.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(Plantarouter);
app.use(CosechaRouter);
app.use(FundoRouter);
app.use(MantenimientoRouter);
app.use(sectorRouter);

export default app