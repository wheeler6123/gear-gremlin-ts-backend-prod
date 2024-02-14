import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//parsing env file
dotenv.config({ path: resolve(__dirname, '.env') });
//function to load env variables
const getConfig = () => {
    return {
        MONGO_URI: process.env.MONGO_URI,
        PORT: process.env.PORT ? parseInt(process.env.PORT) : undefined,
        NODE_ENV: process.env.NODE_ENV,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRATION: process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : undefined,
        JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION ? parseInt(process.env.JWT_REFRESH_EXPIRATION) : undefined,
        SESSION_SECRET: process.env.SESSION_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
    };
};
//function to validate env variables
const validateConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Environment variable ${key} is not set`);
        }
    }
    return config;
};
//call functions to load and validate variables
const config = getConfig();
const validatedConfig = validateConfig(config);
export default validatedConfig;
