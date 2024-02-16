import express, { Request, Response } from 'express';
import config from './config/config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authRoutes } from './routes/Auth.routes.js';
import { itemRoutes } from './routes/Item.routes.js';
import { tripRoutes } from './routes/Trip.routes.js';
import { categoryTagRoutes } from './routes/CategoryTag.routes.js';
import { usageTagRoutes } from './routes/UsageTag.routes.js';

export const app = express();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.json('Hello World!');
    }
);

// Setup rate limiting
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,  // 15 minutes
    max: 100,                  // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});

app.use(apiLimiter);


//connect to MongoDB
const connectDB = async () => {
    const connection = await mongoose.connect(config.MONGO_URI)
    console.log(`MongoDB connected: ${connection.connection.host}`);
}

connectDB();

//create routes
authRoutes(app);
itemRoutes(app);
tripRoutes(app);
categoryTagRoutes(app);
usageTagRoutes(app);



//start server
app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    }
);

