import ItemController from "../controllers/Item.controller.js";
import { Router } from "express";
const router = Router();
export const itemRoutes = (app) => {
    app.use('/api/auth/items', router);
    router.post('/', ItemController.createItem);
    router.get('/', ItemController.getAllItems);
    router.get('/search', ItemController.getAllItemsByName);
    router.get('/packed/:id', ItemController.getAllPackedItems);
    router.get('/:id', ItemController.getOneItem);
    router.put('/:id', ItemController.updateItem);
    router.delete('/:id', ItemController.deleteItem);
};
