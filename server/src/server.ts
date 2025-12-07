/**
 * IMPORTS
 */

import { green } from "colors";
import compression from "compression";
import cookieParser from "cookie-parser";
import type { CorsOptions } from "cors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import logSymbols from "log-symbols";
import { createServer } from "node:http";
import { Server } from "socket.io";

import config from "@/config";
import limit from "@/lib/express_rate_limit";
import { connectToDatabase, disconnectFromDatabase } from "@/lib/mongoose";
import routerV1 from "@/routes/v1";
import { setupSocket } from "./realtime";
import { errorHandler } from "./middlewares/handlers/errorHandler";

/**
 * SERVER
 */

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: config.NODE_ENV === "development" ? "*" : config.WHITELISTED_DOMAINS,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const corsOptions: CorsOptions = {
    origin(origin, callback) {
        if (
            config.NODE_ENV === "development" ||
            !origin ||
            config.WHITELISTED_DOMAINS.includes(origin)
        ) {
            callback(null, true);
        } else {
            callback(
                new Error(`Not allowed by CORS || ORIGIN: ${origin}`),
                false
            );
            console.log(`Not allowed by CORS || ORIGIN: ${origin}`);
        }
    },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(
    compression({
        threshold: 1024,
    })
);
app.use(limit);

setupSocket(io);

(async () => {
    try {
        await connectToDatabase();

        app.use("/api/v1/", routerV1);
        app.use(errorHandler);

        server.listen(config.PORT, () => {
            console.log(
                logSymbols.success,
                green(
                    `Server listening on port http://localhost:${config.PORT}`
                )
            );
        });

    } catch (error) {
        console.log("Failed to start serrver", error);

        if (config.NODE_ENV === "production") {
            process.exit(1);
        }
    }
})();

const handleShutdown = async () => {
    try {
        await disconnectFromDatabase();

        console.log("Shutting down server...");
        process.exit(0);
    } catch (err) {
        console.log("Error shutting down server", err);
    }
};

process.on("SHUTDOWN", handleShutdown);
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);
