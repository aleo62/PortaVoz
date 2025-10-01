import config from "@/config";
import Chat from "@/models/Chat.model";
import Message from "@/models/Message.model";
import { findOrCreateChat } from "@/services/ChatService";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

/**
 * GET - Controller responsável por pegar os chats de um User.
 */

export const getChats = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verifying if user is authenticated
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        // Verifying if page is provided
        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_MESSAGES_PER_PAGE;

        // Fetching messages
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
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        // Sending response
        res.status(200).json({
            chats: chatsData,
            hasMore: count > page * limit,
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
/**
 * GET - Controller responsável por pegar os chats de um User.
 */

export const getChatById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if user is authenticated
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        // Fetching messages
        const chat = await Chat.findById(req.params.chatId)
            .populate({
                path: "participants",
                select: "username image",
                match: { _id: { $ne: uid } },
            })
            .exec();

        // Sending response
        res.status(200).json({
            chat,
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

/**
 * GET - Controller responsável por pegar as mensagens pelo chat id
 */
export const getMessagesByChatId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if user is authenticated
        if (!req.user) throw new Error("No User provided");

        // Verifying if page is provided
        const page = !req.query.page ? 1 : Number(req.query.page),
            limit = config.SYSTEM_MESSAGES_PER_PAGE;

        // Fetch chat id
        const chatId = req.params.chatId;
        if (!chatId) throw new Error("chat id not informed.");

        // Fetching messages
        const count = await Message.countDocuments({ chatId });

        const messagesData = await Message.find({ chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        // Sending response
        res.status(200).json({
            chatId,
            messages: messagesData.reverse(),
            hasMore: count > page * limit,
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
/**
 * POST - Controller responsável por pegar as mensagens pelos usuarios
 */

export const getChatByUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifying if user is authenticated
        if (!req.user) throw new Error("No User provided");

        // Sending response
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
