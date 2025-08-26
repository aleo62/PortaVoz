import { getNotifications } from "@/controllers/NotificationController";
import { createUserCounter, followUser, getFollowing, unfollowUser, updateUserContent } from "@/controllers/UserController";
import { authenticateUser } from "@/middlewares/auth";
import { validationError } from "@/middlewares/validationError";
import { Router } from "express";

const router = Router();

// PUT - Rota para atualizar todos os cometarios e posts de um user
router.put(
    "/update",
    authenticateUser,
    validationError,
    updateUserContent
);

// POST - Rota para criar counter
router.post(
    "/:userId/counter",
    authenticateUser,
    validationError,
    createUserCounter
);

// GET - Rota para ver se segue
router.get(
    "/:followingId/following",
    authenticateUser,
    validationError,
    getFollowing
);

// POST - Rota para adicionar seguidor
router.post(
    "/:followingId/follow",
    authenticateUser,
    validationError,
    followUser
);

// DELETE - Rota para remover seguidor
router.delete(
    "/:unfollowId/unfollow",
    authenticateUser,
    validationError,
    unfollowUser
);

// GET - Rota para notificações
router.get(
    "/notifications",
    authenticateUser,
    validationError,
    getNotifications
);

export default router;
