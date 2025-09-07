// Roteador de posts: define endpoint para criação de post
import {
    getChats,
    getMessagesByChatId,
    getMessagesByUsers,
} from "@/controllers/ChatController";
import { authenticateUser } from "@/middlewares/auth";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { validationError } from "@/middlewares/validationError";
import { Router } from "express";
import Chat from "@/models/Chat.model";

const router = Router();

// GET - Rota para pegar chats dos users
router.get("/", authenticateUser, validationError, getChats);
// GET - Rota para pegar chats dos users
router.get(
    "/:chatId/messages",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req) => {
        const chat = await Chat.findById(req.params.chatId);
        if (!chat) throw new Error("Chat does not exist");
        return chat.participants;
    }),
    validationError,
    getMessagesByChatId
);
// GET - Rota para pegar as mensagens antigas
router.get(
    "/with/:otherUser/messages",
    authenticateUser,
    validationError,
    getMessagesByUsers
);

export default router;
