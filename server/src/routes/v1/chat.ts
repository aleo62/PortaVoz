// Roteador de posts: define endpoint para criação de post
import {
    getChatByUsers,
    getChats,
    getMessagesByChatId,
} from "@/controllers/ChatController";
import { authenticateUser } from "@/middlewares/auth";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { validationError } from "@/middlewares/validationError";
import Chat from "@/models/Chat.model";
import { Router } from "express";
import { body } from "express-validator";

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
        console.log(chat.participants);
        return chat.participants;
    }),
    validationError,
    getMessagesByChatId
);
// POST - Rota para pegar o chat com base nos users
router.post(
    "/start",
    authenticateUser,
    body("otherUserId")
        .trim()
        .notEmpty()
        .withMessage("otherUserId is required"),
    validationError,
    getChatByUsers
);

export default router;
