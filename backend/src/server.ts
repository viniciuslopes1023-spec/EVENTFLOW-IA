import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { env } from './config/env.js';
import { routes } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(env.port, () => {
  console.log(`EventFlow IA API running on port ${env.port}`);
});