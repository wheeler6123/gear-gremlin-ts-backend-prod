import TripController from "../controllers/Trip.controller";
import { Router } from "express";

const router = Router();

export const tripRoutes = (app: any) => {

    app.use('/api/auth/trips', router);

    router.post('/', TripController.createTrip);

    router.get('/', TripController.getAllTripsByUser);

    router.get('/:id', TripController.getOneTrip);

    router.put('/:id', TripController.updateTrip);

    router.delete('/:id', TripController.deleteTrip);
};