import config from "@/config";
import {
    deleteChat as deleteChatService,
    findOrCreateChat,
    getChatByIdService,
    getChatsService,
    getMessagesByChatIdService,
    readChatMessagesService,
} from "@/services/ChatService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

export const getChats = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_MESSAGES_PER_PAGE;

        const result = await getChatsService(uid, page, limit);

        res.status(200).json(result);
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};

export const getChatById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        const chat = await getChatByIdService(req.params.chatId, uid);

        res.status(200).json({ chat });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};

export const getMessagesByChatId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");

        const page = !req.query.page ? 1 : Number(req.query.page),
            limit = config.SYSTEM_MESSAGES_PER_PAGE;

        const chatId = req.params.chatId;
        if (!chatId) throw new Error("chat id not informed.");

        const result = await getMessagesByChatIdService(chatId, page, limit);

        res.status(200).json(result);
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};

export const getChatByUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");

        const chatId = (
            await findOrCreateChat(req.user.uid, req.body.otherUserId)
        )._id;
        res.status(200).json({
            chatId,
        });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};

export const deleteChat = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");

        await deleteChatService(req.params.chatId);

        res.status(200).json({
            message: "Chat deleted successfully",
        });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};

export const readChatMessages = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        await readChatMessagesService(req.params.chatId, uid);

        res.status(200).json({
            message: "Messages marked as read",
        });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};
