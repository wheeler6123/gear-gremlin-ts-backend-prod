import CategoryTagController from "../controllers/CategoryTag.controller.js";
import { Router } from "express";
const router = Router();
export const categoryTagRoutes = (app) => {
    app.use('/api/auth', router);
    router.get('/categoryTags/user/:userId', CategoryTagController.getAllTagsByUser);
    router.post('/categoryTags/user/:userId', CategoryTagController.createTag);
};
