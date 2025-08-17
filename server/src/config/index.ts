/**
 * Carrega variáveis de ambiente e centraliza configurações da aplicação.
 */
import dotenv from "dotenv";

dotenv.config();

// Objeto de configuração central da aplicação
const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    WHITELISTED_DOMAINS: ["https://portavoz.vercel.app"],
    MONGO_URI: process.env.MONGO_URI,
    IMAGE_PROVIDER: process.env.IMAGE_PROVIDER,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_KEY: process.env.CLOUD_KEY,
    CLOUD_SECRET: process.env.CLOUD_SECRET,
    FIREBASE_API_LEAD: process.env.FIREBASE_API_LEAD,
    FIREBASE_DOMAIN: process.env.FIREBASE_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    SYSTEM_ID_SIZE: parseInt(process.env.SYSTEM_ID_SIZE || "20"),
    SYSTEM_MAXIMUM_REPORTS: parseInt(process.env.SYSTEM_MAXIMUM_REPORTS || "2"),
    SYSTEM_POSTS_PER_PAGE: parseInt(
        process.env.SYSTEM_POSTS_PER_PAGE || "5"
    ),
    SYSTEM_COMMENTS_PER_PAGE: parseInt(
        process.env.SYSTEM_COMMENTS_PER_PAGE || "15"
    ),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
};

export default config;
