import { type Request, type Response } from 'express';
import express from 'express';
import { listaMercadoPrisma } from '../db.ts';

const categoryController = express.Router();

categoryController.get('/', async (req: Request, res: Response) => {
    try {
        res.send(await listaMercadoPrisma.category.findMany());
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.get('/:id', async (req: Request, res: Response) => {
    try {
        const category = await listaMercadoPrisma.category.findFirst({
            where: {
                id: String(req.params.id)
            }
        })
        res.send(category);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.post('/', async (req: Request, res: Response) => {
    try {
        res.send(await listaMercadoPrisma.category.create({ data: req.body }));
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.put('/:id', async (req: Request, res: Response) => {
    try {
        res.send(await listaMercadoPrisma.category.update({
            where: {
                id: String(req.params.id)
            },
            data: {
                ...req.body,
                id: req.params.id
            }
        }));
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

categoryController.delete('/:id', async (req: Request, res: Response) => {
    try {
        await listaMercadoPrisma.shopItem.deleteMany({
            where: {
                categoryId: String(req.params.id)
            }
        })

        res.send(await listaMercadoPrisma.category.delete({
            where: {
                id: String(req.params.id)
            }
        }));
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : error);
    }
});

export default categoryController;

