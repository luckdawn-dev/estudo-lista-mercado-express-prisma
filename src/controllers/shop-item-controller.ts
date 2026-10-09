import express from 'express';
import { listaMercadoPrisma } from '../db.ts';

const shopItemController = express.Router();

shopItemController.get('/', async (req, res) => {
    try {
        const itemList = await listaMercadoPrisma.shopItem.findMany();

        res.send(itemList);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.get('/:categoryId', async (req, res) => {
    try {
        const shopItem = await listaMercadoPrisma.shopItem.findMany({
            where: {
                categoryId: req.params.categoryId
            }
        });

        res.send(shopItem);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.post('/', async (req, res) => {
    try {
        const shopItem = await listaMercadoPrisma.shopItem.create({data: req.body});

        res.send(shopItem);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.put('/:id', async (req, res) => {
    try {
        const shopItem = await listaMercadoPrisma.shopItem.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body,
                id: req.params.id
            }
        });


        res.send(shopItem);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.delete('/:id', async (req, res) => {
    try {
        await listaMercadoPrisma.shopItem.delete({
            where: {
                id: req.params.id
            }
        });

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default shopItemController;