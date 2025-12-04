import Chat from "@/models/Chat.model";
import Message, { MessageData } from "@/models/Message.model";
import {
    getChatParticipants,
    incrementUnreadMessages,
} from "@/services/ChatService";
import { Server, Socket } from "socket.io";
import { UserRegistered } from ".";

export const chatHandlers = (
    io: Server,
    socket: Socket,
    usersRegistered: UserRegistered
) => {
    socket.on("join_chat", async (chatId: string) => {
        socket.join(chatId);
        const userId = socket.data.userId;

        if (usersRegistered[userId]) {
            usersRegistered[userId].chatId = chatId;
        }
    });

    socket.on("leave_chat", async () => {
        const userId = socket.data.userId;

        if (usersRegistered[userId]) {
            usersRegistered[userId].chatId = "";
        }
    });

    socket.on("send_message", async (data: Omit<MessageData, "deleted">) => {
        const message = await Message.create(data);
        const participants = await getChatParticipants(data.chatId);
        await Chat.findByIdAndUpdate(data.chatId, {
            $set: {
                recentMessage: message._id,
            },
        });

        io.to(data.chatId).emit("new_message", message);
        if (!participants) return;

        for (const userId of participants) {
            if (userId === socket.data.userId) continue;
            if (usersRegistered[userId]) {
                if (
                    usersRegistered[userId].chatId === "" ||
                    usersRegistered[userId].chatId !== data.chatId
                ) {
                    incrementUnreadMessages(data.chatId, userId);
                    io.to(usersRegistered[userId].socketId).emit(
                        "unread_message",
                        message
                    );
                }
            } else {
                incrementUnreadMessages(data.chatId, userId);
            }

            await Chat.findByIdAndUpdate(data.chatId, {
                $set: { [`visible.${userId}`]: true },
            });
        }
    });
};
