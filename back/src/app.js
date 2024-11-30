const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

import Plantarouter from './routes/PlantaRoute';
import FrutoRouter from './routes/FrutoRoute';
import FundoRouter from './routes/FundoRoute';
import MantenimientoRouter from './routes/MantenimientoRouter';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(Plantarouter);
app.use(FrutoRouter);
app.use(FundoRouter);
app.use(MantenimientoRouter);

export default app