// Roteador de posts: define endpoint para criação de post
import {
    getChatById,
    getChatByUsers,
    getChats,
    getMessagesByChatId,
} from "@/controllers/ChatController";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { authenticateUser } from "@/middlewares/authUser";
import { authenticateVerified } from "@/middlewares/authVerified";
import { validationError } from "@/middlewares/validationError";
import Chat from "@/models/Chat.model";
import { Request, Router } from "express";
import { body } from "express-validator";

const router = Router();

// GET - Rota para pegar chats dos users
router.get("/", authenticateVerified, authenticateUser, validationError, getChats);
// GET - Rota para pegar chats dos users
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
// GET - Rota para pegar chats peloId
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
// POST - Rota para pegar o chat com base nos users
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

export default router;
