import config from "@/config";
import Chat from "@/models/Chat.model";
import Message from "@/models/Message.model";
import User from "@/models/User.model";
import { generateId } from "@/utils/generateId";

export async function findOrCreateChat(userA: string, userB: string) {
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userA, userB] },
        });

        if (!chat) {
            const _id = generateId(config.SYSTEM_ID_SIZE, "R_");
            chat = await Chat.create({
                _id,
                participants: [userA, userB],
                visible: {
                    [userA]: true,
                    [userB]: false,
                },
            });
        }

        if (!chat.visible.get(userA)) {
            chat.visible.set(userA, true);
            await chat.save();
        }

        return chat;
    } catch (err) {
        throw err;
    }
}

export async function deleteChat(chatId: string) {
    try {
        await Message.deleteMany({ chatId });
        await Chat.findByIdAndDelete(chatId);
    } catch (err) {
        throw err;
    }
}

export async function incrementUnreadMessages(chatId: string, userId: string) {
    await Chat.findByIdAndUpdate(chatId, {
        $inc: { [`unreadCounts.${userId}`]: 1 },
    });

    await User.findByIdAndUpdate(userId, {
        $inc: { "meta.counters.unreadChatMessages": 1 },
    });
}

export const readChatMessagesService = async (
    chatId: string,
    userId: string
) => {
    const chat = await Chat.findById(chatId);
    if (!chat) return;

    const unreadCount = chat.unreadCounts.get(userId) || 0;
    if (unreadCount === 0) return;

    chat.unreadCounts.set(userId, 0);
    await chat.save();

    await User.findByIdAndUpdate(userId, {
        $inc: { "meta.counters.unreadChatMessages": -unreadCount },
    });
};

export const getChatParticipants = async (chatId: string) => {
    const chat = await Chat.findById(chatId);
    return chat?.participants;
};

export const getChatsService = async (
    uid: string,
    page: number,
    limit: number
) => {
    const count = await Chat.countDocuments({ participants: uid });
    const chatsData = await Chat.find({
        participants: uid,
        [`visible.${uid}`]: true,
    })
        .populate({
            path: "participants",
            select: "username image",
            match: { _id: { $ne: uid } },
        })
        .populate({
            path: "recentMessage",
            select: "text senderId createdAt",
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    const chats = chatsData.map((chat: any) => ({
        ...chat,
        unreadChatMessages: chat.unreadCounts?.[uid] || 0,
    }));

    return {
        chats,
        hasMore: count > page * limit,
    };
};

export const getChatByIdService = async (chatId: string, uid: string) => {
    const chat = await Chat.findById(chatId)
        .populate({
            path: "participants",
            select: "username image",
            match: { _id: { $ne: uid } },
        })
        .exec();

    return chat;
};

export const getMessagesByChatIdService = async (
    chatId: string,
    page: number,
    limit: number
) => {
    const count = await Message.countDocuments({ chatId });

    const messagesData = await Message.find({ chatId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

    return {
        chatId,
        messages: messagesData.reverse(),
        hasMore: count > page * limit,
    };
};
