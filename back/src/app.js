const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

import Plantarouter from './routes/PlantaRoute';
import FrutoRouter from './routes/FrutoRoute';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(Plantarouter)
app.use(FrutoRouter);

export default app