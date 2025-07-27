import { updateUserContent } from "@/controllers/UserController";
import { authenticateUser } from "@/middlewares/auth";
import { validationError } from "@/middlewares/validationError";
import { Router } from "express";

const router = Router();

// PUT - Rota para atualizar todos os cometarios e posts de um user
router.put(
    "/update/:userId",
    authenticateUser,
    validationError,
    updateUserContent
);

export default router;
