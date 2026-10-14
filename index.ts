import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import categoryController from './src/controllers/category-controller.ts';
import shopItemController from './src/controllers/shop-item-controller.ts';

const app: Express = express();

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use(cors());
app.use(express.json());

import { errorHandler } from './src/middleware/errorHandler.ts';

app.use('/category', categoryController);
app.use('/shopItem', shopItemController);

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(errorHandler);

export { app };

if (!process.env.VERCEL) {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}