import { type Request, type Response } from 'express';
import express from 'express';
import { categoryService } from '../services/category.service.ts';
import { validate } from '../middleware/validate.ts';
import { categorySchema, categoryUpdateSchema } from '../schemas/category.schema.ts';

import { categoryService } from '../services/category.service.ts';
const categoryController = express.Router();

categoryController.get('/', async (req: Request, res: Response) => {
    try {
        res.send(await categoryService.findMany());
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.get('/:id', async (req: Request, res: Response) => {
    try {
        const category = await categoryService.findById(String(req.params.id));
        res.send(category);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.post('/', validate(categorySchema), async (req: Request, res: Response) => {
    try {
        res.send(await categoryService.create(req.body));
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.put('/:id', async (req: Request, res: Response) => {
    try {
        res.send(await categoryService.update(String(req.params.id), {
            ...req.body,
            id: req.params.id
        }));
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await categoryService.deleteShopItemsByCategory(String(req.params.id));

        res.send(await categoryService.delete(String(req.params.id)));
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

export default categoryController;

