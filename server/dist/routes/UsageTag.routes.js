import { Router } from "express";
import UsageTagController from '../controllers/UsageTag.controller.js';
const router = Router();
export const usageTagRoutes = (app) => {
    app.use('/api/auth', router);
    router.get('/usageTags/user/:userId', UsageTagController.getAllTagsByUser);
    router.post('/usageTags/user/:userId', UsageTagController.createTag);
};
