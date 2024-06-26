import { Request, Response } from "express";
import UserController from "../controllers/Auth.controller.js";

export const authRoutes = (app: any) => {

    app.use((_req: Request, res: Response, next: any) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/auth/register', UserController.register);

    app.post('/api/auth/login', UserController.login);

    app.post('/api/auth/logout', UserController.logout);

    app.put('/api/auth/changePassword', UserController.changePassword);

    app.get('/api/auth/oauth/google', UserController.googleOauthLogin);

    };
