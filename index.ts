import express, { type Express } from 'express';
import cors from 'cors';
import categoryController from './src/controllers/category-controller.ts';
import shopItemController from './src/controllers/shop-item-controller.ts';

const app: Express = express();

app.use(cors());
app.use(express.json());

import { errorHandler } from './src/middleware/errorHandler.ts';

app.use('/category', categoryController);
app.use('/shopItem', shopItemController);

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});