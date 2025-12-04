import { Server } from "socket.io";
import { chatHandlers } from "./chat";

export type UserRegistered = {
    [key: string]: { socketId: string; chatId: string };
};

export const setupSocket = (io: Server) => {
    const usersRegistered: UserRegistered = {};

    io.on("connection", (socket) => {
        socket.on("register_user", async (data: any) => {
            socket.data.userId = data.userId;
            usersRegistered[data.userId] = { socketId: socket.id, chatId: "" };
            console.log("Ususário entrou: " + data.userId);
        });

        chatHandlers(io, socket, usersRegistered);
    });

    io.on("disconnect", (socket) => {
        for (const userId in usersRegistered) {
            if (usersRegistered[userId].socketId === socket.id) {
                delete usersRegistered[userId];
                break;
            }
        }
    });
};
