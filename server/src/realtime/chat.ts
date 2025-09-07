import Message, { MessageData } from "@/models/Message.model";
import { Server, Socket } from "socket.io";

export const chatHandlers = (io: Server, socket: Socket, usersRegistered: Record<string, string>) => {
    socket.on("join_chat", async (chatId: string) => {
        socket.join(chatId);
        console.log(`User entered in this chat: ${chatId}`)
    });

    socket.on("send_message", async (data: Partial<MessageData>) => {
        const message = await Message.create(data)
        io.to(data.chatId as string).emit("new_message", message);
        console.log(data)
    });
};
