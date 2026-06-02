import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/events', taskRoutes);
app.use('/api', taskRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(env.port, () => {
  console.log(`EventFlow IA API running on port ${env.port}`);
});