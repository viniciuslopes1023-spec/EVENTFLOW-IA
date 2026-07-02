import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

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
app.use('/api/events', transactionRoutes);
app.use('/api/events', supplierRoutes);
app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(env.port, () => {
  console.log(`EventFlow IA API running on port ${env.port}`);
});