import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index';

dotenv.config();

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(cors());
app.use(express.json());



// Подключаем роутеры
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});