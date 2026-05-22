import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = Number(process.env.PORT) || 3333;

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  return response.status(200).json({
    status: 'ok',
    service: 'EventFlow IA API',
  });
});

app.listen(port, () => {
  console.log(`EventFlow IA API running on port ${port}`);
});