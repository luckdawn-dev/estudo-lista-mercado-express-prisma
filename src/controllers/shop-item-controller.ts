import express from 'express';
import { shopItemService } from '../services/shop-item.service.ts';

const shopItemController = express.Router();

shopItemController.get('/', async (req, res) => {
    try {
        const itemList = await shopItemService.findMany();

        res.send(itemList);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.get('/:categoryId', async (req, res) => {
    try {
        const shopItem = await shopItemService.findByCategory(req.params.categoryId);

        res.send(shopItem);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.post('/', async (req, res) => {
    try {
        const shopItem = await shopItemService.create(req.body);

        res.send(shopItem);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.put('/:id', async (req, res) => {
    try {
        const shopItem = await shopItemService.update(req.params.id, {
            ...req.body,
            id: req.params.id
        });


        res.send(shopItem);
    } catch (error) {
        res.status(500).send(error);
    }
})

shopItemController.delete('/:id', async (req, res) => {
    try {
        await shopItemService.delete(req.params.id);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default shopItemController;