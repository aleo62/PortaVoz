import { Server } from "socket.io";
import { chatHandlers } from "./chat";

export const setupSocket = (io: Server) => {
    const usersRegistered: Record<string, string> = {}; 
    
    io.on("connection", (socket) => {
        socket.on("register_user", async (userId: string) => {
            usersRegistered[userId] = socket.id
            console.log("User registered:", userId);
        })

        chatHandlers(io, socket, usersRegistered);
        console.log("User connected:", socket.id);
    });
};
