import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import itemService from '../services/itemServices.js';

const itemController = Router();

itemController.post('/create',authMiddleware, async (req, res) => {
    const { title, url, description, quantity, price } = req.body;

    try {
        await itemService.create(title, description, url, quantity, price);
        res.json({ message: "success" })
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.get('/',authMiddleware, async (req, res) => {
    try {
        const items = await itemService.getAll();
        res.json(items)
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.get('/:id',authMiddleware, async (req, res) => {
    const { id: itemId } = req.params;
    try {
        const item = await itemService.getItemById(itemId);
        res.json(item)
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.delete('/:id',authMiddleware, async (req, res) => {
    const { id: itemId } = req.params;
    try {
        await itemService.deleteById(itemId);
        res.json({ message: "success" })
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.put('/:id',authMiddleware, async (req, res) => {
    const { id: itemId } = req.params;
    const {title, url, description, quantity, price} = req.body;
    try {
        await itemService.updateById(itemId, title, url, description, quantity, price);
        res.json({ message: "success" })
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.post('/buy/:id',authMiddleware, async (req, res) => {
    const { quantity } = req.body;
    const { id: itemId } = req.params;
    
    try {
        await itemService.buyItem(req.user.id, itemId, quantity);
        res.json({ message: "success" })
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.get('/user/items',authMiddleware, async (req, res) => {
    try {
        const {items} = await itemService.getAllUserItems(req.user.id);
        res.json(items)
    } catch (err) {
        res.json({ error: err.message });
    }
});

itemController.get('/user/items/:id',authMiddleware, async (req, res) => {
    const { id: itemId } = req.params;
    
    try {
        const item = await itemService.getSingleUserItem(req.user.id, itemId);
        res.json(item)
    } catch (err) {
        res.json({ error: err.message });
    }
});

export default itemController