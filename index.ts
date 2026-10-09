import express, { type Express } from 'express';
import cors from 'cors';
import categoryController from './src/controllers/category-controller.ts';
import shopItemController from './src/controllers/shop-item-controller.ts';

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use('/category', categoryController);
app.use('/shopItem', shopItemController);

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});