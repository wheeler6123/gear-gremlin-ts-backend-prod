import { Router } from "express";
import UsageTagController from '../controllers/UsageTag.controller';

const router = Router();

export const usageTagRoutes = (app: any) => {

    app.use('/api/auth', router);

    router.get('/usageTags/user/:userId', UsageTagController.getAllTagsByUser);

    router.post('/usageTags/user/:userId', UsageTagController.createTag);
};