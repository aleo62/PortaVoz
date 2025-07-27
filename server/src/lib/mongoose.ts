/**
 * Configuração e utilitários para conexão com o MongoDB usando Mongoose.
 */
import config from "@/config";
import type { ConnectOptions } from "mongoose";
import mongoose from "mongoose";

// Opções do cliente mongoose
const clientOptions: ConnectOptions = {
    dbName: "portavoz",
    appName: "PortaVoz",
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
};

/**
 * Conecta ao banco de dados MongoDB
 */
export const connectToDatabase = async (): Promise<void> => {
    if (!config.MONGO_URI) throw new Error("MONGO_URI is not defined");

    try {
        await mongoose.connect(config.MONGO_URI, clientOptions);
        console.log(`Successfully connected to database`);
    } catch (err) {
        if (err instanceof Error) throw err;

        console.log("Failed to connect to database", err);
    }
};

/**
 * Desconecta do banco de dados MongoDB
 */
export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from database", {
            uri: config.MONGO_URI,
            options: clientOptions,
        });
    } catch (err) {
        console.log("Failed to disconnect from database", err);
    }
};
