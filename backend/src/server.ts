import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(env.port, () => {
  console.log(`EventFlow IA API running on port ${env.port}`);
});