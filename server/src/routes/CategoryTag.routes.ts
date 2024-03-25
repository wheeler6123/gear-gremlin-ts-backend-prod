import CategoryTagController from "../controllers/CategoryTag.controller";
import { Router } from "express";

const router = Router();

export const categoryTagRoutes = (app: any) => {

    app.use('/api/auth', router);

    router.get('/categoryTags/user/:userId', CategoryTagController.getAllTagsByUser);

    router.post('/categoryTags/user/:userId', CategoryTagController.createTag);
};