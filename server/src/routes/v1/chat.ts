import {
    deleteChat,
    getChatById,
    getChatByUsers,
    getChats,
    getMessagesByChatId,
    readChatMessages,
} from "@/controllers/ChatController";
import { authenticateOwnerOrAdmin } from "@/middlewares/auth/authOwnerOrAdmin";
import { authenticateUser } from "@/middlewares/auth/authUser";
import { authenticateVerified } from "@/middlewares/auth/authVerified";
import { validationError } from "@/middlewares/validation/validationError";
import Chat from "@/models/Chat.model";
import { Request, Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get(
    "/",
    authenticateUser,
    authenticateVerified,
    validationError,
    getChats
);

router.get(
    "/:chatId/messages",
    authenticateUser,
    authenticateVerified,
    authenticateOwnerOrAdmin(async (req: Request) => {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) throw new Error("Chat does not exist");
        return chat.participants;
    }),
    validationError,
    getMessagesByChatId
);

router.get(
    "/:chatId",
    authenticateUser,
    authenticateVerified,
    authenticateOwnerOrAdmin(async (req: Request) => {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) throw new Error("Chat does not exist");
        return chat.participants as string[];
    }),
    validationError,
    getChatById
);

router.post(
    "/start",
    authenticateUser,
    authenticateVerified,
    body("otherUserId")
        .trim()
        .notEmpty()
        .withMessage("otherUserId is required"),
    validationError,
    getChatByUsers
);

router.delete(
    "/:chatId",
    authenticateUser,
    authenticateVerified,
    authenticateOwnerOrAdmin(async (req: Request) => {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) throw new Error("Chat does not exist");
        return chat.participants as string[];
    }),
    validationError,
    deleteChat
);

router.put(
    "/:chatId/read",
    authenticateUser,
    authenticateVerified,
    validationError,
    readChatMessages
);

export default router;
